const {forwardTo} = require('prisma-binding');
const { hasPermission } = require('../utils');

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
    async users(parent, args, ctx, info) {
        // 1. Check if they are logged in
        if (!ctx.request.userId) {
            throw new Error('You must be logged in!');
        }
        console.log(ctx.request.userId);
        // 2. Check if the user has the permissions to query all the users
        hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

        // 2. If they do, query all the users!
        return ctx.db.query.users({}, info);
    },
};

module.exports = Query;
