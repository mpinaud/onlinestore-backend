const {forwardTo} = require('prisma-binding');

const Query = {
    // If there is no need for authentication, filtering, custom logic, and the query is exactly the same between Yoga and Prisma.
    items: forwardTo('db'),
    item: forwardTo('db'),

    // Alternate version
    // async items(parent, args, ctx, info) {
    //     const items = await ctx.db.query.items();
    //     return items;
    // }
};

module.exports = Query;
