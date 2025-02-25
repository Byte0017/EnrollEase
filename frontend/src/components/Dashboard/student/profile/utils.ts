// utils.ts

export const fetchUserDataFromFirestore = (): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Ajay Yadav",
          photo: "https://www.pinterest.com/pin/643451865544165419/",
          jeeApplicationNumber: "202599998000",
          mobile: "+91 9999778822",
          email: "john.doe@example.com",
          course: "B.Tech", // New field
          allotedBranch: "Information Technology", // New field
        });
      }, 1000); // Simulate network delay
    });
  };