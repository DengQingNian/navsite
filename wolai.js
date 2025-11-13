require('dotenv').config();
const axios = require('axios');

async function getWolaiToken() {
    return await axios.post(
        'https://openapi.wolai.com/v1/token',
        {
            appId: process.env.WOLAI_APP_ID,
            appSecret: process.env.WOLAI_APP_SECRET
        },
        {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
    ).then(resp => {
        return resp.data.data
    });
}

async function getWolaiDatabase(token) {
    return await axios.get(
        "https://openapi.wolai.com/v1/databases/" + process.env.WOLAI_DATABASE_ID,
        {
            headers: {
                "Authorization": token
            }
        }
    ).then (resp => {
        return resp.data.data.rows.map(d => {
            return {
                id: 0,
                name: d.data.站点名称.value,
                url: d.data.网址.value,
                category: d.data.分类.value,
                sort: d.data.排序.value,
                icon: d.data.图标.value
            }
        }).filter(d => d.name != '')
    })
}

async function addWolaiDatabaseRow(token, createRecordBody) {
    return await axios.post(
    `https://openapi.wolai.com/v1/databases/${process.env.WOLAI_DATABASE_ID}/rows`,
    createRecordBody,
    {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
  ).then(resp => resp.data);
}

module.exports = {
    getWolaiToken,
    getWolaiDatabase,
    addWolaiDatabaseRow
}