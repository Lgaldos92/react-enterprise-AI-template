import { DatabaseRepository } from './repositories/DatabaseRepository';
import { SupabaseRepository } from './repositories/SupabaseRepository';

export const getDatabase = (): DatabaseRepository => {
  // In the future, this can switch based on env or comfyUI extension config:
  // if (config.engine === 'sqlite') return new SqliteRepository();
  return new SupabaseRepository();
};

export const db = getDatabase();
