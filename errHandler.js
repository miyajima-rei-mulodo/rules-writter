const handleError = (error) => {
    console.log(error);
    process.exit(1);

}

exports.handle = handleError