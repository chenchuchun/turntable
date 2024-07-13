// 类去实现状态机
class Status{
  // 接下来是要把这些参数由用户生成才行
  static first = new Status('first')
  static second = new Status('second')
  static third = new Status('third')
  static statusMap = {
    first: {
      next: Status.second,
      before: null
    },
    second: {
      next: Status.third,
      before: Status.first
    },
    third: {
      before: Status.second,
      next: null // 已经是最后一个状态了
    }
  };
  constructor(status){
    this.activeStatus = status;
  }
  // 返回当前的流程
  nowStatus(){
    return this.activeStatus
  }
  // 改变当前状态 改变当前状态然后去存储数据和获取上一步的数据
  changeStatus(flag){
    const currentStatusConfig = Status.statusMap[this.activeStatus];
    if(flag == 'next'){
      if (currentStatusConfig && currentStatusConfig.next) {
        return currentStatusConfig.next;
      } else {
        return null; // 已经是最后一个状态了
      }
    }else if(flag == 'before'){
      if (currentStatusConfig && currentStatusConfig.before) {
        return currentStatusConfig.before;
      } else {
        return null; // 已经是最后一个状态了
      }
    }
  }
}

export default Status