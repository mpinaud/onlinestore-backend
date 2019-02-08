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
