const errorFormat = ({ location, msg, param, value, nestedErrors }) => {
        return `${msg}`;
};

module.exports = { errorFormat }