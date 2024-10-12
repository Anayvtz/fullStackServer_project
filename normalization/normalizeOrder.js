const { getUser } = require("../dataAccess/usersDataAccessService")

const normalizeOrder = async (userId, rawOrder) => {
    let user = await getUser(userId);
    return {
        ...rawOrder,
        customerId: userId,
        customerName: user.name,
        customerAddress: user.address,
        customerEmail: user.email,
        status: "inprocess"
    }
}
module.exports = normalizeOrder;