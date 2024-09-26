/**
 * @fileoverview 库存查询示例，构建 HTTP 请求
 * 并处理响应。
 *
 */

const url = "https://www.apple.com/hk-zh/shop/fulfillment-messages/"; // 库存查询的 URL
const method = "GET"; // 使用 GET 方法查询库存
const headers = {"Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","Cache-Control":"no-cache"}; // 可根据需要设置头部信息
const params = {
    searchNearby: true,
    "parts.0": "MWWP3ZP/A",
    "option.0": ["MWX13ZP/A,MXL53FE/A","MWX13ZP/A,MXL33FE/A","MWX13ZP/A,MU9R3FE/A","MWX13ZP/A,MXU13FE/A","MWX13ZP/A,MYJD3FE/A"]
}; // 查询参数

// 构建查询字符串
const searchParams = new URLSearchParams();
for (const key in params) {
    if (Array.isArray(params[key])) {
        params[key].forEach(value => searchParams.append(key, value));
    } else {
        searchParams.append(key, params[key]);
    }
}

const myRequest = {
    url: url + "?" + new URLSearchParams(params).toString(), // 构建带查询参数的 URL
    method: method, // 可选，默认为 GET。
    headers: headers // 可选。
};

$task.fetch(myRequest).then(response => {
    const responseBody = JSON.parse(response.body); // 解析响应体
    const desiredData = responseBody.body.content.pickupMessage.stores[0].partsAvailability.Z0YQ.pickupSearchQuote; // 提取所需的数据，假设数据在 someKey 中
    console.log(desiredData);
    $notify("库存查询", "成功", `提取的数据: ${desiredData}`); // 成功处理并展示提取的数据
    $done();
}, reason => {
    // reason.error
    $notify("库存查询", "错误", reason.error); // 错误处理！
    $done();
});
