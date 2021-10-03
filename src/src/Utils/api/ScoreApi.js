export const fetchAllScore = async () => {
  try {
    // Mock API request. (just delay 500ms)
    const wait = () => {
      return new Promise(resolve => {
        setTimeout(resolve, 500);
      });
    };
    
    await wait();

    return [10,20,30,100];
  } catch (err) {
    console.log(err);
  }
};
