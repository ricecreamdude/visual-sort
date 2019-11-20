class Bar {
  constructor(value){
    this.value = value;
    this.status = 'normal';
  }

  setActive(){
    this.status = 'active';
  }

  setNormal(){
    this.status = 'normal';
  }
  

}

export default Bar;