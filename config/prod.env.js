'use strict'
const target = process.env.npm_lifecycle_event;
if (target == 'online') {
  //测试
  var obj = {
    NODE_ENV: "'production'",
    //post用当前域名
    API_ROOT: "''"
  }
}else {
  //线上
  var obj = {
    NODE_ENV: "'test'",
    //post用当前域名
    API_ROOT: "''"
  }
}
module.exports = obj;
// module.exports = {
//   NODE_ENV: '"production"'
// }
