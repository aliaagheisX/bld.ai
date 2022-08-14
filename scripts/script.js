/*  */
async function getCourses() {
    try {
        let response = await fetch('http://localhost:3000/data');
        let data = await response.json();
        console.log(data.aws_res);
    }
    catch (error) {
        console.log("error", error);
    }
}

getCourses();