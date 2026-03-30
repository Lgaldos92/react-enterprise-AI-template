export interface GenericEntity {
  id: number;
  created_at: string;
}

export interface Profile extends GenericEntity {
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  updated_at: string;
}

// Add your NEW domain types here.

