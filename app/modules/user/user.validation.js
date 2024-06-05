const z = require('zod')

// Defined the schema for the cart items
const cartItemSchema = z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid ObjectId"
});

// Defined the main schema for the user
const userSchema = z.object({
    name: z.string({
        invalid_type_error: 'Password must be string',
    })
        .max(20, { message: 'Password can not be more than 20 characters' }),
    email: z.string({
        invalid_type_error: 'Password must be string',
    })
        .max(20, { message: 'Password can not be more than 20 characters' }),
    password: z
        .string({
            invalid_type_error: 'Password must be string',
        })
        .max(20, { message: 'Password can not be more than 20 characters' }),
    cart: z.array(cartItemSchema).optional(),
    ratings: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid ObjectId"
    }).optional()
});

module.exports = { userSchema };
