const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutation = {
    async createItem(parent, args, ctx, info) {
        const item = await ctx.db.mutation.createItem(
            {
                data: {
                    ...args,
                },
            },
            info
        );
        return item;
    },
    async deleteItem(parent, args, ctx, info) {
        const where = {id: args.id};
        // Find the item
        const item = await ctx.db.query.item({where}, `{id title}`);
        // Check if they own that item of have permissions
        // TODO
        // Delete it
        return ctx.db.mutation.deleteItem({where}, info);
    },
    async signup(parent, args, ctx, info) {
        // lowercase the email
        args.email = args.email.toLowerCase();
        // hash their password
        const password = await bcrypt.hash(args.password, 10);
        // create the user in the database
        const user = await ctx.db.mutation.createUser(
            {
                data: {
                    ...args,
                    password,
                    // how to use an ENUM
                    permissions: {set: ['USER']},
                },
            },
            info
        );
        // create the JWT token for them
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        // We set the jwt as a cookie on the response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        // Finally return the user to the browser
        return user;
    },
    updateItem(parent, args, ctx, info) {
        // First take a copy of the updates
        const updates = {...args};
        // Remove id from updates
        delete updates.id;
        // Run the update method
        return ctx.db.mutation.updateItem(
            {
                data: updates,
                where: {
                    id: args.id,
                },
            },
            info
        );
    },
};

module.exports = Mutation;
