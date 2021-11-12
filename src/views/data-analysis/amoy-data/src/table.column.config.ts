// online-market 市场大盘
const onlineMarketColumn = (level) => {
  return [
    {
      field: 'parentName0',
      title: '一级类目',
      minWidth: '150',
      visible: Number(level) && Number(level) != 6
    },
    {
      field: 'parentName1',
      title: '二级类目',
      minWidth: '150',
      visible: Number(level) > 1 && Number(level) != 6
    },
    {
      field: 'parentName2',
      title: '三级类目',
      minWidth: '150',
      visible: Number(level) > 2 && Number(level) != 6
    },
    {
      field: 'parentName3',
      title: '四级类目',
      minWidth: '150',
      visible: Number(level) > 3 && Number(level) != 6
    },
    {
      field: 'parentName4',
      title: '五级类目',
      minWidth: '150',
      visible: Number(level) > 4 && Number(level) != 6
    },
    {
      field: 'brandName',
      title: '品牌',
      minWidth: '150',
      visible: Number(level) == 6
    },
    {
      field: 'salesVolume',
      title: '销售额（千万）',
      minWidth: '150',
      visible: true,
      sortable: true
    },
    {
      field: 'salesQuantity',
      title: '销售量（千万）',
      minWidth: '150',
      visible: true,
      sortable: true
    },
    {
      field: 'shopQuantity',
      title: '店铺数',
      minWidth: '150',
      visible: true,
      sortable: true
    },
    {
      field: 'goodsQuantity',
      title: '商品数',
      minWidth: '150',
      visible: true,
      sortable: true
    },
    {
      field: 'comentsQuantity',
      title: '评论数（百万）',
      minWidth: '150',
      visible: true,
      sortable: true
    },
    {
      field: 'forkQuantity',
      title: '收藏数（百万）',
      minWidth: '150',
      visible: true,
      sortable: true
    }
  ];
};

// online-other 除市场大盘
const columnData = {
  // 淘系品牌
  AmoyLine: () => {
    return [
      {
        field: 'name',
        title: '品牌名称',
        minWidth: '150',
        visible: true
      },
      {
        field: 'month',
        title: '月份',
        minWidth: '150',
        visible: true
      },
      {
        field: 'type',
        title: '类型',
        minWidth: '150',
        visible: true
      },
      {
        field: 'dyppYgxiaoshoue',
        title: '抖⾳品牌榜-销售额',
        minWidth: '150',
        visible: true
      },
      {
        field: 'tsjXiaoshoue',
        title: '淘数据-销售额（万元）',
        minWidth: '150',
        visible: true
      },
      {
        field: 'tsjXiaoliang',
        title: '淘数据-销量',
        minWidth: '150',
        visible: true
      },
      {
        field: 'tsjZengsu',
        title: '淘数据增速',
        minWidth: '150',
        visible: true
      },
      {
        field: 'xinzeng',
        title: '是否新增',
        minWidth: '150',
        visible: true
      }
    ];
  },
  // 抖音品牌
  Tiktok: () => {
    return [
      {
        field: 'name',
        title: '品牌名称',
        minWidth: '150',
        visible: true
      },
      {
        field: 'month',
        title: '月份',
        minWidth: '150',
        visible: true
      },
      {
        field: 'type',
        title: '类型',
        minWidth: '150',
        visible: true
      },
      {
        field: 'dyppYgxiaoshoue',
        title: '抖⾳品牌榜-销售额',
        minWidth: '150',
        visible: true
      },
      {
        field: 'dyppYgxiaoliang',
        title: '抖⾳品牌榜-销量',
        minWidth: '150',
        visible: true
      },
      {
        field: 'dyppShangpinshu',
        title: '抖⾳品牌榜-商品数',
        minWidth: '150',
        visible: true
      },
      {
        field: 'dyppGuanlianzhibo',
        title: '抖⾳品牌榜-关联直播',
        minWidth: '150',
        visible: true
      },
      {
        field: 'dyppGuanlianshipin',
        title: '抖⾳品牌榜-关联视频',
        minWidth: '150',
        visible: true
      },
      {
        field: 'dyppZengsu',
        title: '抖⾳品牌榜-增速',
        minWidth: '150',
        visible: true
      },
      {
        field: 'tsjXiaoshoue',
        title: '淘数据-销售额（万元）',
        minWidth: '150',
        visible: true
      },
      {
        field: 'xinzeng',
        title: '是否新增',
        minWidth: '150',
        visible: true
      }
    ];
  },
  // 小红书
  SmallRedBook: () => {
    return [
      {
        field: 'name',
        title: '品牌名称',
        minWidth: '150',
        visible: true
      },
      {
        field: 'month',
        title: '月份',
        minWidth: '150',
        visible: true
      },
      {
        field: 'type',
        title: '类型',
        minWidth: '150',
        visible: true
      },
      {
        field: 'xhsHudongliang',
        title: '⼩红书-互动量',
        minWidth: '150',
        visible: true
      },
      {
        field: 'xhsYugufeiyong',
        title: '⼩红书-预估投放费⽤',
        minWidth: '150',
        visible: true
      },
      {
        field: 'xhsBijishu',
        title: '⼩红书-笔记数',
        minWidth: '150',
        visible: true
      },
      {
        field: 'xhsHezuoren',
        title: '⼩红书-合作⼈',
        minWidth: '150',
        visible: true
      },
      {
        field: 'xhsZengsu',
        title: '⼩红书-增速',
        minWidth: '150',
        visible: true
      },
      {
        field: 'dyppYgxiaoshoue',
        title: '抖⾳品牌榜-销售额',
        minWidth: '150',
        visible: true
      },
      {
        field: 'tsjXiaoshoue',
        title: '淘数据-销售额（万元）',
        minWidth: '150',
        visible: true
      },
      {
        field: 'xinzeng',
        title: '是否新增',
        minWidth: '150',
        visible: true
      }
    ];
  },
  // 直播
  Lives: () => {
    return [
      {
        field: 'name',
        title: '品牌名称',
        minWidth: '150',
        visible: true
      },
      {
        field: 'month',
        title: '月份',
        minWidth: '150',
        visible: true
      },
      {
        field: 'type',
        title: '类型',
        minWidth: '150',
        visible: true
      },
      {
        field: 'dyppYgxiaoshoue',
        title: '抖⾳品牌榜-销售额',
        minWidth: '150',
        visible: true
      },
      {
        field: 'dyzbKedanjia',
        title: '抖⾳直播榜-客单价',
        minWidth: '150',
        visible: true
      },
      {
        field: 'dyzbXiaoshoue',
        title: '抖⾳直播榜-销售额',
        minWidth: '150',
        visible: true
      },
      {
        field: 'dyzbXiaoliang',
        title: '抖⾳直播榜-销量',
        minWidth: '150',
        visible: true
      },
      {
        field: 'dyzbZhiboshu',
        title: '抖⾳直播榜-直播数',
        minWidth: '150',
        visible: true
      },
      {
        field: 'dyzbZengsu',
        title: '抖⾳直播榜-增速',
        minWidth: '150',
        visible: true
      },
      {
        field: 'tsjXiaoshoue',
        title: '淘数据-销售额（万元）',
        minWidth: '150',
        visible: true
      },
      {
        field: 'xinzeng',
        title: '判断是否新增',
        minWidth: '150',
        visible: true
      }
    ];
  },
  // 分众
  AllPerson: () => {
    return [
      {
        field: 'name',
        title: '品牌名称',
        minWidth: '150',
        visible: true
      },
      {
        field: 'month',
        title: '月份',
        minWidth: '150',
        visible: true
      },
      {
        field: 'type',
        title: '类型',
        minWidth: '150',
        visible: true
      },
      {
        field: 'dyppYgxiaoshoue',
        title: '抖⾳品牌榜-销售额',
        minWidth: '150',
        visible: true
      },
      {
        field: 'fzTouruzhishu',
        title: '投⼊指数（万',
        minWidth: '150',
        visible: true
      },
      {
        field: 'fzZengsu',
        title: '分众投放增速',
        minWidth: '150',
        visible: true
      },
      {
        field: 'tsjXiaoshoue',
        title: '淘数据-销售额（万元）',
        minWidth: '150',
        visible: true
      },
      {
        field: 'xinzeng',
        title: '判断是否新增',
        minWidth: '150',
        visible: true
      }
    ];
  }
};

// underline-repast 餐饮
const underlineRepastColumn = () => {
  return [
    {
      field: 'date',
      title: '⽇期',
      minWidth: '150',
      visible: true
    },
    {
      field: 'city',
      title: '城市',
      minWidth: '150',
      visible: true
    },
    {
      field: 'typeDianpu',
      title: '店铺类型',
      minWidth: '150',
      visible: true
    },
    {
      field: 'typeShangpin',
      title: '商品类型',
      minWidth: '150',
      visible: true
    },
    {
      field: 'pinpai',
      title: '品牌/店铺名称',
      minWidth: '150',
      visible: true
    },
    {
      field: 'shuliang',
      title: '店铺数量',
      minWidth: '150',
      visible: true
    },
    {
      field: 'scoreDz',
      title: '⼤众点评分数',
      minWidth: '150',
      visible: true,
      sortable: true
    },
    {
      field: 'pinglunshu',
      title: '大众点评评论数（百万）',
      minWidth: '150',
      visible: true,
      sortable: true
    },
    {
      field: 'xuanzhi',
      title: '选址',
      minWidth: '150',
      visible: true,
      sortable: true
    },
    {
      field: 'dianxing',
      title: '店型',
      minWidth: '150',
      visible: true,
      sortable: true
    },
    {
      field: 'scorePta',
      title: '打分',
      minWidth: '150',
      visible: true,
      sortable: true
    },
    {
      field: 'jianjie',
      title: '简介',
      minWidth: '150',
      visible: true,
      sortable: true
    },
    {
      field: 'liuliang',
      title: '客流量',
      minWidth: '150',
      visible: true,
      sortable: true
    },
    {
      field: 'zhaopai',
      title: '招牌菜',
      minWidth: '150',
      visible: true,
      sortable: true
    },
    {
      field: 'kedanjia',
      title: '客单价',
      minWidth: '150',
      visible: true,
      sortable: true
    }
  ];
};

// underline-retail // 零售
const underlineRetailColumn = () => {
  return [
    {
      field: 'date',
      title: '⽇期',
      minWidth: '150',
      visible: true
    },
    {
      field: 'city',
      title: '城市',
      minWidth: '150',
      visible: true
    },
    {
      field: 'type',
      title: '类型',
      minWidth: '150',
      visible: true
    },
    {
      field: 'pinpai',
      title: '品牌名称',
      minWidth: '150',
      visible: true
    },
    {
      field: 'qudao',
      title: '销售渠道',
      minWidth: '150',
      visible: true
    },
    {
      field: 'dongxiao',
      title: '动销',
      minWidth: '150',
      visible: true
    },
    {
      field: 'introduction',
      title: '简介',
      minWidth: '150',
      visible: true
    },
    {
      field: 'price',
      title: '价格',
      minWidth: '150',
      visible: true
    },
    {
      field: 'xianshang',
      title: '线上渠道',
      minWidth: '150',
      visible: true
    },
    {
      field: 'background',
      title: '品牌背景',
      minWidth: '150',
      visible: true
    },
    {
      field: 'jingpinshu',
      title: '竞品数量',
      minWidth: '150',
      visible: true
    },
    {
      field: 'jingpinming',
      title: '竞品名称',
      minWidth: '150',
      visible: true
    },
    {
      field: 'jingpindongxiao',
      title: '竞品动销',
      minWidth: '150',
      visible: true
    }
  ];
};

// underline-other // 其他业态
export const underlineOtherColumn = () => {
  return [
    {
      field: 'date',
      title: '⽇期',
      minWidth: '150',
      visible: true
    },
    {
      field: 'city',
      title: '城市',
      minWidth: '150',
      visible: true
    },
    {
      field: 'typeDianpu',
      title: '店铺类型',
      minWidth: '150',
      visible: true
    },
    {
      field: 'typeShangpin',
      title: '商品类型',
      minWidth: '150',
      visible: true
    },
    {
      field: 'pinpai',
      title: '品牌/店铺名称',
      minWidth: '150',
      visible: true
    },
    {
      field: 'shuliang',
      title: '店铺数量',
      minWidth: '150',
      visible: true
    },
    {
      field: 'scoreDz',
      title: '⼤众点评分数',
      minWidth: '150',
      visible: true
    },
    {
      field: 'pinglunshu',
      title: '⼤众点评评论数 (百万)',
      minWidth: '150',
      visible: true
    },
    {
      field: 'xuanzhi',
      title: '选址',
      minWidth: '150',
      visible: true
    },
    {
      field: 'dianxing',
      title: '店型',
      minWidth: '150',
      visible: true
    },
    {
      field: 'scorePSta',
      title: '打分',
      minWidth: '150',
      visible: true
    },
    {
      field: 'jianjie',
      title: '简介',
      minWidth: '150',
      visible: true
    },
    {
      field: 'liuliang',
      title: '客流量',
      minWidth: '150',
      visible: true
    },
    {
      field: 'zhaopai',
      title: '招牌菜',
      minWidth: '150',
      visible: true
    },
    {
      field: 'kedanjia',
      title: '客单价',
      minWidth: '150',
      visible: true
    }
  ];
};

export const currentTableColumn = (type, level, channelType) => {
  const ptype = type.split('-')[0];
  if (ptype == 'online') {
    if (type == 'online-market') {
      return onlineMarketColumn(level);
    } else {
      console.log(channelType);
      return columnData[channelType](level);
    }
  }
  if (type == 'underline-repast') return underlineRepastColumn();
  if (type == 'underline-retail') return underlineRetailColumn();
  if (type == 'underline-other') return underlineOtherColumn();
};
