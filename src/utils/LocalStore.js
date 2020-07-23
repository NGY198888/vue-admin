const preFix="admin_";
const set=(key,val)=>{
    sessionStorage.setItem(preFix+key,JSON.stringify(val));
}
const get=(key,def_val)=>{
   try {
      return   JSON.parse(sessionStorage.getItem(preFix+key)) ;
   } catch (error) {
       return def_val
   }
}
export default {
   set,
   get
}