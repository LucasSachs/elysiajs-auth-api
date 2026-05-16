import { strongPasswordRegex } from 'src/common/regex';
import z from 'zod';

export const createUserDto = z.object({
  email: z.email(),
  password: z.string().regex(strongPasswordRegex, { error: 'Password must be a strong password (8+ chars, upper, lower, digit, special)' }),
  username: z.string().min(3).max(255),
});
