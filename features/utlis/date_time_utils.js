let month = ['January', 'February', 'March',
   'April', 'May', 'June', 'July',
   'August', 'September', 'October', 'November', 'December'];

exports.getCurrentTimeInSec = function () {
   return Math.floor(Date.now() / 1000);
}

let date = new Date();

exports.getCurrentDate = function () {
   return date.getDate();
}

exports.getDateOrdinal = function (date) {
   if (date > 3 && date < 21)
      return 'th';

   switch (date % 10) {
      case 1:
         return 'st';
      case 2:
         return 'nd';
      case 3:
         return 'rd';
      default:
         return 'th';
   }
}

exports.getWeekStartDate = function (duration) {
   let day = date.getDay();
   let time = date.getTime();
   let currentWeekStartDate = new Date(time - 60 * 60 * 24 * (day - 1) * 1000);

   switch (duration.toLowerCase()) {
      case 'current':
         return currentWeekStartDate.getDate();
      case 'previous':
         let previousWeekStartDate = new Date(currentWeekStartDate.getTime() - 60 * 60 * 24 * 7 * 1000);
         return previousWeekStartDate.getDate();
      case 'next':
         let nextWeekStartDate = new Date(currentWeekStartDate.getTime() + 60 * 60 * 24 * 7 * 1000);
         return nextWeekStartDate.getDate();
      default:
         console.log('Duration not supported in WeekStartDate : ' + duration);
   }
}

exports.getWeekStartMonth = function (duration) {
   let day = date.getDay();
   let time = date.getTime();
   let currentWeekStartDate = new Date(time - 60 * 60 * 24 * (day - 1) * 1000);

   switch (duration.toLowerCase()) {
      case 'current':
         return month[currentWeekStartDate.getMonth()];
      case 'previous':
         let previousWeekStartDate = new Date(currentWeekStartDate.getTime() - 60 * 60 * 24 * 7 * 1000);
         return month[previousWeekStartDate.getMonth()];
      case 'next':
         let nextWeekStartDate = new Date(currentWeekStartDate.getTime() + 60 * 60 * 24 * 7 * 1000);
         return month[nextWeekStartDate.getMonth()];
      default:
         console.log('Duration not supported in WeekStartMonth : ' + duration);
   }
}

exports.getWeekEndDate = function (duration) {
   let day = date.getDay();
   let time = date.getTime();
   let currentWeekStartDate = new Date(time - 60 * 60 * 24 * (day - 1) * 1000);
   let currentWeekLastDate = new Date(currentWeekStartDate.getTime() + 60 * 60 * 24 * 6 * 1000);

   switch (duration.toLowerCase()) {
      case 'current':
         return currentWeekLastDate.getDate();
      case 'previous':
         let previousWeekLastDate = new Date(currentWeekStartDate.getTime() - 60 * 60 * 24 * 1 * 1000);
         return previousWeekLastDate.getDate();
      case 'next':
         let nextWeekLastDate = new Date(currentWeekLastDate.getTime() + 60 * 60 * 24 * 7 * 1000);
         return nextWeekLastDate.getDate();
      default:
         console.log('Duration not supported in WeekEndingMonth : ' + duration);
   }
}

exports.getWeekEndMonth = function (duration) {
   let day = date.getDay();
   let time = date.getTime();
   let currentWeekStartDate = new Date(time - 60 * 60 * 24 * (day - 1) * 1000);
   let currentWeekLastDate = new Date(currentWeekStartDate.getTime() + 60 * 60 * 24 * 6 * 1000);

   switch (duration.toLowerCase()) {
      case 'current':
         return month[currentWeekLastDate.getMonth()];
      case 'previous':
         let previousWeekLastDate = new Date(currentWeekStartDate.getTime() - 60 * 60 * 24 * 1 * 1000);
         return month[previousWeekLastDate.getMonth()];
      case 'next':
         let nextWeekLastDate = new Date(currentWeekLastDate.getTime() + 60 * 60 * 24 * 7 * 1000);
         return month[nextWeekLastDate.getMonth()];
      default:
         console.log('Duration not supported in WeekEndingMonth : ' + duration);
   }
}

exports.getMonth = function (duration) {
   let currentMonth = date.getMonth();

   switch (duration.toLowerCase()) {
      case 'current':
         return month[currentMonth];
      case 'previous':
         if (currentMonth == 0) {
            return month[11];
         }
         return month[currentMonth - 1];
      case 'next':
         if (currentMonth == 11) {
            return month[0];
         }
         return month[currentMonth + 1];
      default:
         console.log('Duration not supported in month : ' + duration);
   }
}

exports.getCurrentYear = function () {
   return date.getFullYear();
}

exports.getNumbersFromString = function (inputString) {
   let numbers = inputString.replace(/\D/g, "");
   numbers = parseInt(numbers)
   return numbers;
}