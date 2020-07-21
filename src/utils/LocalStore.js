const preFix="admin_";
const set=(key,val)=>{
    localStorage.setItem(preFix+key,JSON.stringify(val));
}
const get=(key,def_val)=>{
   try {
      return   JSON.parse(localStorage.getItem(preFix+key)) ;
   } catch (error) {
       return def_val
   }
}
export default {
   set,
   get
}