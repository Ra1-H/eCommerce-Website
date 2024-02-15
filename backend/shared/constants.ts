export const hashFileName = (filename: string)=>{
    const randomPrefix = Math.floor(Math.random()*1000).toString();
    // hashes a filename
    // ref: https://stackoverflow.com/a/47617289
    return (randomPrefix+filename).split('').map(v=>v.charCodeAt(0)).reduce((a,v)=>a+((a<<7)+(a<<3))^v).toString(16);
}