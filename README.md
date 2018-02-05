## Firebase Helper Library built with TypeScript

### Launch Date: 2/10/2018
### Under development

const testFirebase = new Firebase(config);

testFirebase.createRef('users');

const key = testFirebase.addData({name:'boba',age:22})

const getData = (snapshot:any) => {
  const newArray = Object.keys(snapshot);
  console.log(newArray)
};

testFirebase.fetchData(true,getData)

testFirebase.createTransferRef('oldUser');

testFirebase.transferDataAndDeleteOriginal('-L4_2-YcK-0w0IS9kzn9')
