export default function(x1:number,y1:number,x2:number,y2:number){
    const a1 = Math.pow(Math.abs(y2-y1),2)
    const a2 = Math.pow(Math.abs(x2-x1),2)
    const res = Math.sqrt(a1+a2)
    return res
}