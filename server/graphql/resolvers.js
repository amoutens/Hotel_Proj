const Client = require('../models/Clients');

const resolvers = {
  getClient: async ({ id }) => await Client.findById(id),
  getClients: async () => await Client.find(),

  createClient: async ({ input }) => {
    const client = new Client(input);
    return await client.save();
  },

  updateClient: async ({ id, input }) => {
    return await Client.findByIdAndUpdate(id, input, { new: true });
  },

  deleteClient: async ({ id }) => {
    return await Client.findByIdAndDelete(id);
  }
};

module.exports = resolvers;
