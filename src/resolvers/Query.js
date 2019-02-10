const {forwardTo} = require('prisma-binding');

const Query = {
    // If there is no need for authentication, filtering, custom logic, and the query is exactly the same between Yoga and Prisma.
    item: forwardTo('db'),
    itemsConnection: forwardTo('db'),
    items: forwardTo('db'),
    // Alternate version
    // async items(parent, args, ctx, info) {
    //     const items = await ctx.db.query.items();
    //     return items;
    // }
    me(parent, args, ctx, info) {
        // check if there is a current user ID
        if (!ctx.request.userId) {
            return null;
        }
        return ctx.db.query.user(
            {
                where: { id: ctx.request.userId },
            },
            info
        );
    },
};

module.exports = Query;
