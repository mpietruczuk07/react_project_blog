const CurrentDate = () => {
    let date = new Date();
    let currentYear = date.getFullYear();
    return(
        <span>
            {currentYear}
        </span>
    )
};

export default CurrentDate;
