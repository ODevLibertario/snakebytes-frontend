export class PlayLog {

  private log: any[] = []
  private eats: any[] = []

  recordMovement(direction: string){
    if(this.log.length == 0){
      this.log.push(direction)
    }else{
      let last = this.log[this.log.length - 1]
      let secondLast = this.log[this.log.length - 2]
      let hasCounter = false

      if(typeof last == "number"){
        hasCounter = true
        last = secondLast
      }


      if(last == direction){
          if(hasCounter){
            this.log[this.log.length - 1] = this.log[this.log.length - 1] + 1
          }else {
            this.log.push(2)
          }
      }else {
        this.log.push(direction)
      }
    }
  }

  recordEat(x: number, y: number){
    this.eats.push({x, y})
    this.log.push('EAT'+(this.eats.length - 1))
  }

  print(){
    console.log(this.log)
    console.log(this.eats)
  }

}
