var scheme1 = {
        name: 'gate',
        type: 'xor',
        children: [
            {
                name: 'gate',
                type: 'and',
                children: [
                    {
                        name: 'switch',
                        state: true
                    },
                    {
                        name: 'switch',
                        state: false
                    }
                ]
            }, {
                name: 'gate',
                type: 'not',
                children: [
                    {
                        name: 'switch',
                        state: true
                    }
                ]
            }
        ]
    },

    scheme2 = {
        name: 'gate',
        type: 'and',
        children: [
            {
                name: 'gate',
                type: 'or',
                children: [
                    {
                        name: 'switch',
                        state: true
                    },
                    {
                        name: 'gate',
                        type: 'xor',
                        children: [
                            {
                                name: 'switch',
                                state: false
                            },
                            {
                                name: 'gate',
                                type: 'not',
                                children: [
                                    {
                                        name: 'switch',
                                        state: true
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }, {
                name: 'gate',
                type: 'not',
                children: [
                    {
                        name: 'switch',
                        state: true
                    }
                ]
            }
        ]
    },

    scheme3 = {
        name: 'gate',
        type: 'xor',

        children: [
            {
                name: 'gate',
                type: 'not',
                children: [
                    {
                        name: 'switch',
                        state: false
                    }
                ]
            }, {
                name: 'gate',
                type: 'or',
                children: [
                    {
                        name: 'gate',
                        type: 'or',
                        children: [
                            {
                                name: 'switch',
                                state: false
                            },
                            {
                                name: 'gate',
                                type: 'and',
                                children: [
                                    {
                                        name: 'switch',
                                        state: false
                                    },
                                    {
                                        name: 'switch',
                                        state: true
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'switch',
                        state: false
                    }
                ]
            }
        ]
    };


function or(a,b) {
    return a || b;
}
function and(a,b) {
    return a && b;
}
function xor(a,b) {
    return a ^ b;
}
function not(a) {
    return !a;
}
/*=====================*/

var actions = {
    or: function(a,b) {
        return a || b;
    },
    and: function(a,b) {
        return a && b;
    },
    xor: function(a,b) {
        return !!(a ^ b);
    },
    not: function(a) {
        return !a;
    }
};



function operation(type, action){

    if (arr[arr.length - 1].type === type) {
        if ((arr[arr.length - 1].a !== '') && (arr[arr.length - 1].b !== '')) {
            //console.log(arr);
            if (arr[arr.length - 2].a === '') {
                arr[arr.length - 2].a = action(arr[arr.length - 1].a, arr[arr.length - 1].b);
                //console.log(arr[arr.length - 2]);
                // console.log('+');
            } else {
                arr[arr.length - 2].b = action(arr[arr.length - 1].a, arr[arr.length - 1].b);
                //console.log(arr[arr.length - 2]);
                //console.log('-');
            }
            onOff = true;
        }
    }

}

function operationIsNot() {

    if (arr[arr.length - 1].type === 'not') {
        if (arr[arr.length - 1].a !== '') {
            //console.log(arr);

            //console.log('tut');
            if (arr[arr.length - 2].a === '') {
                arr[arr.length - 2].a = not(arr[arr.length - 1].a);
                //console.log(arr[arr.length - 2]);
                //console.log('+');
            } else {
                arr[arr.length - 2].b = not(arr[arr.length - 1].a);
                // console.log(arr[arr.length - 2]);
                // console.log('-');
            }
            onOff = true;
        }
    }

}

function lastOperation(type, action){

    if((arr.length === 1) && (arr[arr.length - 1].type === type) && (arr[arr.length - 1].a !== '') && (arr[arr.length - 1].b !== '')){
        if(action(arr[arr.length - 1].a, arr[arr.length - 1].b)){
            alert( "Lamp is lighting");
            return false;
        } else{
            alert( "Lamp is not lighting");
            return false;
        }
    }
    return true;
}

function lastOperationIsNot(){

    if((arr.length === 1) && (arr[arr.length - 1].type === 'not') && (arr[arr.length - 1].a !== '')){
        if(not(arr[arr.length - 1].a)){
            alert( "Lamp is lighting");
            return false;
        } else{
            alert( "Lamp is not lighting");
            return false;
        }
    }
    return true;
}




var counterForArr = 0;// далее используется для очевидной идентификации ячейки массива(arr) которая принимает информацию о текущем положении в структуре (Object)
var arr = [];       //далее используется для хранения асоциативного массива, который строится в процессе похожжния одной из веток структуры;
                    // выполняются операции из обрабатываемой ветки; затем массив зачищается до момента ответвления и начинает обрабатываться следующая ветка
var onOff = false;   //далее используется для индикации входа в одно из условий (not, and, or, xor)

function isLight(scheme) {

    for(var key in scheme){
        //console.log(scheme[key]);

        if(key === 'state'){
            if(arr[arr.length-1].a === ''){
                arr[arr.length-1].a = scheme[key];
            }else {
                arr[arr.length-1].b = scheme[key];
            }

        }

        if(key === 'type'){
            var Object = {};
            Object.a = '';
            Object.b = '';
            Object.type = scheme[key];
            arr[counterForArr] = Object;
            ++counterForArr;
            //arr.push(Object);
        }

        do{
            if (arr[arr.length - 1]) {
                onOff = false;

                operationIsNot();
                operation('and', and);
                operation('or', or);
                operation('xor', xor);

                if (onOff) {
                    delete (arr[arr.length - 1]);
                    --counterForArr;
                    --arr.length;
                }


                if(lastOperationIsNot()){
                    if(lastOperation('or', or)) {
                        if(lastOperation('and', and)){
                            if(lastOperation('xor', xor)){
                            }else{return;}
                        }else{return;}
                    }else{return;}
                }else{return;}
            }
        }while(onOff)


        if (typeof scheme[key] === 'object') {

            isLight(scheme[key]);
        }
    }

}




isLight(scheme3);
