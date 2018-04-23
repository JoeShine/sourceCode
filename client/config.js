/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://m1l9u7yu.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/tunnel`,
        //获取微信用户的uid
        uidUrl:`${host}/form/getuid`,
        //登记URL
        regUrl:`${host}/form/reg`,
        //查询
        getUrl:`${host}/form/get`,
    }
};

module.exports = config;
