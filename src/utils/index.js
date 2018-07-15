export default function getFilterArray(array){
    const res = [];
    const json = {};
    for (let i = 0;i<array.length;i++){
        const __self = array[i];
        if(!json[__self]){
            res.push(__self);
            json[__self] = 1;
        }
    }
    return res;
}