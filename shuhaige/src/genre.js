load('config.js');
function execute() {
  return Response.success([
    { title: '玄幻', input: BASE_URL + '/XuanHuan/', script: 'gen.js' },
    { title: '奇幻', input: BASE_URL + '/QiHuan/', script: 'gen.js' },
    { title: '武侠', input: BASE_URL + '/WuXia/', script: 'gen.js' },
    { title: '都市', input: BASE_URL + '/DuShi/', script: 'gen.js' },
    { title: '历史', input: BASE_URL + '/LiShi/', script: 'gen.js' },
    { title: '军事', input: BASE_URL + '/JunShi/', script: 'gen.js' },
    { title: '悬疑', input: BASE_URL + '/XuanYi/', script: 'gen.js' },
    { title: '游戏', input: BASE_URL + '/YouXi/', script: 'gen.js' },
    { title: '科幻', input: BASE_URL + '/KeHuan/', script: 'gen.js' },
    { title: '体育', input: BASE_URL + '/TiYu/', script: 'gen.js' },
    { title: '古言', input: BASE_URL + '/GuYan/', script: 'gen.js' },
    { title: '现言', input: BASE_URL + '/XianYan/', script: 'gen.js' },
    { title: '幻言', input: BASE_URL + '/HuanYan/', script: 'gen.js' },
    { title: '仙侠', input: BASE_URL + '/XianXia/', script: 'gen.js' },
    { title: '青春', input: BASE_URL + '/QinɡChun/', script: 'gen.js' },
    { title: '穿越', input: BASE_URL + '/ChuanYue/', script: 'gen.js' },
    { title: '女生', input: BASE_URL + '/NuShenɡ/', script: 'gen.js' },
    { title: '其他', input: BASE_URL + '/QiTa/', script: 'gen.js' }
  ]);
}
