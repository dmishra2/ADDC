#!/usr/bin/env python2.7
""" This scripts uploads the E2E Cucumber automated test reports to Confluence
    Link: https://tools.publicis.sapient.com/confluence/display/ADDC/ADDc-E2E-Reports
    Note that the main ADDC-Automation-Reports parent page must exist for the script to run
"""
import subprocess
from datetime import datetime
import sys
import json
import requests
import base64
import os
import glob
import re
import datetime

if __name__ == '__main__':

    CONFLUENCE_REST_URL = "https://tools.publicis.sapient.com/confluence/rest/api/content"
    CONFLUENCE_SPACE_KEY = "ACMOBA"
    PAGE_TITLE_PREFIX = "ADDC-Automation-Reports"
    CONFLUENCE_AUTH_HEADER = \
            {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "Authorization" : "Basic " + base64.b64encode(os.environ['CONFLUENCE_USER'] + ':' + os.environ['CONFLUENCE_PASSWORD']).strip()
            }

    def set_page_hierarchy_titles(report_file):
        """ Evaluates the page titles to use and the hierarchy based on the 
            timestamp on the report file name
        """
        file_name = os.path.basename(report_file)
        report_file_year = re.search(r"([0-9]{4})-([0-9]{2})-([0-9]{2})", file_name).group(1)
        report_file_month = re.search(r"([0-9]{4})-([0-9]{2})-([0-9]{2})", file_name).group(2)
        report_file_date = re.search(r"([0-9]{4})-([0-9]{2})-([0-9]{2})", file_name).group(0)
        report_file_date_obj = datetime.datetime.strptime(report_file_date, "%Y-%m-%d")
        report_file_week_start = (report_file_date_obj - datetime.timedelta(days = report_file_date_obj.weekday())).strftime('%Y%m%d')
        report_file_week_end = (report_file_date_obj + datetime.timedelta(days = (6 - report_file_date_obj.weekday()))).strftime('%Y%m%d')
        return \
            (
                PAGE_TITLE_PREFIX,
                PAGE_TITLE_PREFIX + "-" + report_file_year,
                PAGE_TITLE_PREFIX + "-" + report_file_year + "-" + report_file_month,
                PAGE_TITLE_PREFIX + "-" + report_file_week_start + "-" + report_file_week_end         
            )

    def upload_report_to_confluence(report_file):
        """ Creates the hierarchy tree for the report in Confluence if it doesn't exist and uploads the report file
            For example to upload cucumber-report_Android_6_9:13:8 2018-06-12.html, the hierarchy is
            ADDC-Automation-Reports
                |__ ADDC-Automation-Reports-2018
                            |__ ADDC-Automation-Reports-201806
                                        |__ ADDC-Automation-Reports-20180611-20180617
                                                        |__ cucumber-report_Android_6_9:13:8 2018-06-12.html (attachment)
        """
        confluence_e2e_reports_page_main_id = confluence_page_exists(confluence_e2e_reports_page_title_main)
        confluence_e2e_reports_page_year_id = confluence_page_exists(confluence_e2e_reports_page_title_year)
        confluence_e2e_reports_page_month_id = confluence_page_exists(confluence_e2e_reports_page_title_month)
        confluence_e2e_reports_page_id = confluence_page_exists(confluence_e2e_reports_page_title)
        if not confluence_e2e_reports_page_main_id:
            raise ValueError("Page not found in Confluence - %s" % (confluence_e2e_reports_page_title_main))
        if not confluence_e2e_reports_page_year_id:
            print "Page not found in Confluence - %s. Creating one." % (confluence_e2e_reports_page_title_year)
            confluence_e2e_reports_page_year_id = confluence_create_page(confluence_e2e_reports_page_title_year, confluence_e2e_reports_page_main_id, "")
        if not confluence_e2e_reports_page_month_id:
            print "Page not found in Confluence - %s. Creating one." % (confluence_e2e_reports_page_title_month)
            confluence_e2e_reports_page_month_id = confluence_create_page(confluence_e2e_reports_page_title_month, confluence_e2e_reports_page_year_id, "")
        if not confluence_e2e_reports_page_id:
            print "Page not found in Confluence - %s. Creating one." % (confluence_e2e_reports_page_title)
            page_body = \
                    (
                        '<ac:structured-macro ac:name="attachments">'
                            '<ac:parameter ac:name="old">false</ac:parameter>'
                            '<ac:parameter ac:name="sortOrder">descending</ac:parameter>'
                        '</ac:structured-macro>'
                    )
            confluence_e2e_reports_page_id = confluence_create_page(confluence_e2e_reports_page_title, confluence_e2e_reports_page_month_id, page_body)
        confluence_create_attachment(confluence_e2e_reports_page_id, report_file)

    def confluence_page_exists(page_title):
        """ Checks if a page with the given title exists in Confluence. Note that the combination
            of the page title and the space is unique in Confluence
            Returns the ID of the page if it exists, False otherwise
        """
        req_params = \
            {
                "type" : "page",
                "spaceKey" : CONFLUENCE_SPACE_KEY,
                "title" : page_title,
                "expand" : "space,body.view"
            }
        res = requests.get(CONFLUENCE_REST_URL, headers = CONFLUENCE_AUTH_HEADER, params = req_params)
        if res.ok:
            json_result = res.json()['results']
            if json_result:
                return json_result[0]["id"]
            else:
                return False
        else:
            res.raise_for_status()

    def confluence_create_attachment(page_id, report_file):
        """ Uploads the attachment file to a page in Confluence using Curl. On a successful
            upload a results JSON string is returned by Confluence, else a statusCode JSON string
            containing the error code and the error message
        """
        print "Uploading file as attachment - %s" % (report_file)
        raw_output = subprocess.check_output('curl -s -u "' + \
            os.environ["CONFLUENCE_USER"] + ':' + os.environ["CONFLUENCE_PASSWORD"] + \
            '" -X POST -H "X-Atlassian-Token: nocheck" -F "file=@' + report_file + '" ' + \
            '-F "comment=E2E Test Report. Branch: ' + os.environ["TRAVIS_BRANCH"] + ', Build: ' + os.environ["TRAVIS_BUILD_NUMBER"] + '" ' + \
            CONFLUENCE_REST_URL + '/' + page_id + '/child/attachment', shell=True)
        result = json.loads(raw_output)
        if "statusCode" in result.keys() and int(result["statusCode"]) > 200:
            raise ValueError(result["message"])

    def confluence_create_page(page_title, ancestor_id, page_body):
        """ Creates a new page in Confluence with the given title as a child of the page with
            the specified ancestor ID
            Returns the ID of the page if created successfully, False otherwise
        """
        page_content = \
                {
                    "type" : "page",
                    "title" : page_title,
                    "space" : {
                        "key" : CONFLUENCE_SPACE_KEY
                    },
                    "ancestors" : [
                        {
                            "id": ancestor_id
                        }
                    ],
                    "body" : {
                        "storage" : {
                            "representation" : "storage",
                            "value" : page_body
                        }
                    }
                }
        res = requests.post(CONFLUENCE_REST_URL, headers = CONFLUENCE_AUTH_HEADER, data = json.dumps(page_content))
        if res.ok:
            if res.json()['id']:
                return res.json()['id']
            else:
                return False
        else:
            res.raise_for_status()

    def get_attachments(page_id):
        """ Gets details about attachments to a Confluence page with the supplied ID
        """
        url = CONFLUENCE_REST_URL + '/' + page_id + '/child/attachment'
        res = requests.get(url, headers = CONFLUENCE_AUTH_HEADER)
        if res.ok:
            json_result = res.json()
            result = []
            if 'results' in json_result and json_result['results']:
                for item in json_result['results']:
                    if 'title' in item and item['title']: result.append(
                        {
                            'name' : item['title'], 
                            'uri' : item['_links']['download'],
                            'id' : item['id'],
                            'size' : item['extensions']['fileSize'],
                            'type' : item['extensions']['mediaType']
                        }
                    ) 
            return result
        else:
            res.raise_for_status()

    def delete_attachment(id):
        """ Deletes an attachment with the given ID from Confluence
        """
        url = CONFLUENCE_REST_URL + '/' + id
        res = requests.delete(url, headers = CONFLUENCE_AUTH_HEADER)
        if res.ok:
            pass
        else:
            res.raise_for_status()

    main_page_id = confluence_page_exists(PAGE_TITLE_PREFIX)
    attachment_files = get_attachments(main_page_id)
    
    for report_file in glob.glob("./output/*.html"):
        report_file = os.path.abspath(report_file)
        (
            confluence_e2e_reports_page_title_main, 
            confluence_e2e_reports_page_title_year, 
            confluence_e2e_reports_page_title_month,
            confluence_e2e_reports_page_title 
        ) = set_page_hierarchy_titles(report_file)
        upload_report_to_confluence(report_file)
        report_file_name = os.path.basename(report_file)
        regex = r"cucumber-report_(.*?)_?(Android|iOS)_(\d+)_.*.html"
        data = re.search(regex, report_file_name)
        if data:
            for file in attachment_files:
                if file['name'].startswith('cucumber-report_%s_%s' % (data.group(2), data.group(3))) or file['name'].startswith('cucumber-report_%s_%s_%s' % (data.group(3), data.group(1), data.group(2))):
                    print 'Deleting attachment ' + file['name']
                    delete_attachment(file['id'])

    for json_file in glob.glob("./output/*.html.json"):
        json_file = os.path.abspath(json_file)
        confluence_create_attachment(main_page_id, json_file)
