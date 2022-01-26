/*
动态表单组件
@author huanghe
*/
import moment from 'moment';

let vm;
const initVue = _this => {
    vm = _this;
};
export default {
    initVue,
    // 获取主单字段
    getFormItems() {
        let params = {
            templateId: vm.billName
        };
        return new Promise((resolve, reject) => {
            vm.$get(vm.$API.getTabs, params)
                .then(({ data: result }) => {
                    if (result.flag === vm.GLOBAL.flagSuccess) {
                        const formItems = this.formatFormItems(result.data);
                        resolve(formItems);
                    } else {
                        vm.error(result.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    },
    // 格式化表单数据
    formatFormItems(items) {
        const formItems = [];
        formItems.push(...items.filter(i => i.type !== 'textarea'));
        formItems.push(...items.filter(i => i.type === 'textarea'));
        return formItems;
    },
    // 格式化日期格式
    formatDate(type, val, dateType, format) {
        let dateFormat = format ? format : 'YYYY-MM-DD';
        let value;
        if (dateType === 'dateTime') {
            dateFormat = format ? format : 'YYYY-MM-DD HH:mm';
        }
        if (type === 'rangePicker') {
            if (val && val !== ',' && val !== '') {
                val = val.split(',');
                value = [moment(val[0], dateFormat), moment(val[1], dateFormat)];
            } else {
                value = null;
            }
        } else {
            if (val) {
                value = moment(val, dateFormat);
            } else {
                value = null;
            }
        }
        return value;
    },
    // 转换为驼峰格式
    toCamelCase(str) {
        str = str.toLowerCase();
        let s =
            str &&
            str
                .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
                .join('');
        return s.slice(0, 1).toLowerCase() + s.slice(1);
    },
    // 表单校验, 单个校验, 校验都是在值变化完成以后执行
    formatter(item, value, values) {
        // 非空校验
        if (item.isNotEmpty && item.isNotEmpty === 'Y') {
            item.errorText = item.infoName + '不能为空';
            if (value !== null && value !== undefined && value !== '') {
                if(Array.isArray(value)&& value.length ==0){
                    item.isError = true;
                } else {
                    item.isError = false;
                }
            } else {
                item.isError = true;
                return item;
            }
        }
        // 如果是空值，则不校验
        if (!value) {
            item.isError = false;
            return item;
        }
        // 日期范围校验
        if (item.type === 'date' || item.type === 'dateTime') {
            const newVal = moment(value, item.dateFormat);
            let minVal = null;
            let maxVal = null;
            if (item.dateMin && item.dateMin !== 'nowdays') {
                if (item.dateMin.indexOf('-') > -1) {
                    minVal = moment(item.dateMin, item.dateFormat);
                } else {
                    minVal = moment(values[item.dateMin], item.dateFormat);
                }
                if (newVal.valueOf() < minVal.valueOf()) {
                    item.errorText = item.title + '不在规定的范围内';
                    item.isError = true;
                }
            }
            if (item.dateMax && item.dateMax !== 'nowdays') {
                if (item.dateMax.indexOf('-') > -1) {
                    minVal = moment(item.dateMax, item.dateFormat);
                } else {
                    minVal = moment(values[item.dateMax], item.dateFormat);
                }
                if (newVal.valueOf() > maxVal.valueOf()) {
                    item.errorText = item.title + '不在规定的范围内';
                    item.isError = true;
                }
            }
            return item;
        }

        // 最小长度校验
        if (item.minLength !== null && item.minLength !== undefined && item.minLength !== '') {
            if (value && value.length < item.minLength) {
                item.errorText = item.title + '的长度不可少于' + item.minLength;
                item.isError = true;
            } else {
                item.isError = false;
            }
            return item;
        }

        // 长度校验
        if (item.maxLength !== null && item.maxLength !== undefined && item.maxLength !== '' && item.name !== 'CITID' && item.type !== 'mob') {
            // 范围类型
            if (item.extent === '1') {
                // 数字类型转换最大值
                if (item.type === 'int' || item.type === 'money' || item.type === 'float' || item.type === 'percent') {
                    if (
                        value &&
                        (value.split(',')[0] > Math.pow(10, Number(item.maxLength)) - 1 || value.split(',')[1] > Math.pow(10, Number(item.maxLength)) - 1)
                    ) {
                        item.errorText = item.title + '不能超过' + Math.pow(10, Number(item.maxLength)) - 1;
                        item.isError = true;
                    } else {
                        item.isError = false;
                    }
                    if (parseInt(value.split(',')[0]) > parseInt(value.split(',')[1])) {
                        item.isError = true;
                        item.errorText = '最小值不能大于最大值';
                    } else {
                        item.isError = false;
                    }
                } else {
                    // 不是数字类型直接比较
                    if (value && (value.split(',')[0].length > item.maxLength || value.split(',')[1].length > item.maxLength)) {
                        item.errorText = item.title + '的长度不可超过' + item.maxLength;
                        item.isError = true;
                    } else {
                        item.isError = false;
                    }
                }
                return item;
            }
            // 非范围类型
            if (value && value.length > item.maxLength) {
                item.errorText = item.title + '的长度不可超过' + item.maxLength;
                item.isError = true;
            } else {
                item.isError = false;
            }
            return item;
        }

        if (item.extent === '1' && (item.type === 'int' || item.type === 'money' || item.type === 'float' || item.type === 'percent')) {
            if (value) {
                const val = value.split(',');
                if (parseInt(val[0]) > parseInt(val[1])) {
                    item.isError = true;
                    item.errorText = '最小值不能大于最大值';
                } else {
                    item.isError = false;
                }
                return item;
            }
        }
        if (value && item.type === 'mob') {
            item.errorText = '请输入有效的手机号';
            item.isError = this.formatterPhoneOrIdCode(value, 'phone');
            return item;
        }
        if (value && item.name === 'CITID') {
            item.errorText = '请输入有效的身份证号';
            item.isError = this.formatterPhoneOrIdCode(value, 'idCode');
            return item;
        }
        if (!value) {
            item.isError = false;
        }
        return item;
    },
    // 校验手机和身份证号
    formatterPhoneOrIdCode(value, reg) {
        const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        const IdCodeReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
        if (reg === 'phone') {
            return !phoneReg.test(value);
        } else if (reg === 'idCode') {
            return !IdCodeReg.test(value);
        }
    },
    // 表单校验, 整体校验
    formatterAll(formItems, values) {
        const newFormItems = [];
        formItems.forEach(item => {
            newFormItems.push(this.formatter(item, values[item.arField], values));
        });
        return newFormItems;
    },
    // 整个详情页统一校验
    formatterBill(tabs, dataSource) {
        return new Promise((resolve, reject) => {
            let isPasseCheck = true; // 是否通过校验
            let errorMsg = []; // 错误信息集合
            let errorMsgString = []; // 拼好的错误信息集合
            tabs.forEach(tab => {
                // 循环视图
                tab.views.forEach(view => {
                    // 循环页签
                    let data = {};
                    // const thisTabData = dataSource.find(template => template.tabName === tab.id);
                    const thisTabData = dataSource[view.objName];
                    if (thisTabData) {
                        data = thisTabData;
                    }
                    if (view.viewType === '0') {
                        // 校验form表单，并获取错误信息
                        view.fields = this.formatterAll(view.fields, data);
                        view.fields.forEach(item => {
                            if (item.isError === true) {
                                errorMsg.push({
                                    viewName: view.title,
                                    tabName: view.title,
                                    itemName: item.title,
                                    isError: item.isError,
                                    errorText: item.errorText,
                                    item: item
                                });
                                errorMsgString.push(view.title + item.errorText);
                            }
                        });
                    }
                });
            });
            if (errorMsg.length > 0) {
                isPasseCheck = false;
            } else {
                isPasseCheck = true;
            }
            resolve({
                tabs: tabs,
                dataSource: dataSource,
                isPasseCheck: isPasseCheck,
                errorMsg: errorMsg,
                errorMsgString: errorMsgString
            });
        });
    },
    // 下拉框点击
    dropDownChange(item, vmThis) {
        item.assetCommons = [];
        let curItem = vmThis.formItems.find(ele => ele.propertyName === item.propertyName);
        let searchCode = `search_${item.cascadePropertyName}`;
        let params = {};
        if (
            vmThis.formData[item.cascadePropertyName] === null ||
            vmThis.formData[item.cascadePropertyName] === undefined ||
            vmThis.formData[item.cascadePropertyName] === ''
        ) {
            let itemTitle = curItem.title;
            vmThis.warning(`请先选择${itemTitle}`);
            return false;
        } else {
            params[searchCode] = vmThis.formData[item.cascadePropertyName];
            params['serviceCode'] = item.eleServiceCode;
            vmThis.common.selectCommons(params, vmThis).then(res => {
                curItem.assetCommons = res;
            });
            /*if (vmThis.formData[item.propertyName] === '' || vmThis.formData[item.propertyName] === undefined || vmThis.formData[item.propertyName] === null) {

            }*/
        }
    },
    // 获取参数
    handleParams(item, allData) {
        const params = {};
        let paramsSource = [];
        let target = [];
        if (item.popupInfo && item.popupInfo.params) {
            paramsSource = JSON.parse(JSON.stringify(item.popupInfo.params));
            paramsSource.forEach(item => {
                if (item.target.includes('.')) {
                    target = item.target.split('.');
                    params[item.source] = allData[target[0]][target[1]];
                } else {
                    params[item.source] = item.target;
                }
            });
        }
        return params;
    },
    // 处理赋值
    handleResult(item, selectData) {
        const result = {};
        let resultSource = [];
        let source = [];
        let target = [];
        if (item.popupInfo && item.popupInfo.result) {
            resultSource = JSON.parse(JSON.stringify(item.popupInfo.result));
            resultSource.forEach(i => {
                source = i.source.split('.');
                target = i.target.split('.');
                if (!result[target[0]]) {
                    result[target[0]] = {};
                }
                result[target[0]][target[1]] = selectData[source[0]];
            });
        }
        return result;
    }
};
