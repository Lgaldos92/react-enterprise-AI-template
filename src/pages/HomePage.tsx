import React from 'react';
import { Title, Text, Container, Paper, Stack } from '@mantine/core';

const HomePage: React.FC = () => {
  return (
    <Container size="90vw">
      <Stack gap="var(--spacing-lg)" align="stretch">
        <Paper
          p="var(--spacing-md)"
          withBorder
          shadow="sm"
          radius="var(--radius-md)"
          mt="var(--spacing-xl)"
          bg="var(--surface-color)"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <Title order={1} size="var(--font-title-lg)" mb="var(--spacing-sm)" c="var(--text-primary)">
            Dashboard
          </Title>
          <Text c="var(--text-secondary)" size="var(--font-title-md)">
            This project template is initialized with generic CRUD repositories and Azure OpenAI services.
          </Text>
          <Text mt="var(--spacing-text)" size="var(--font-body)" c="var(--text-primary)">
            Define your new data model in <Text span ff="monospace" fw={600}>supabase/schema.sql </Text>
            and update your domain types in <Text span ff="monospace" fw={600}>src/lib/types.ts</Text> to get started.
          </Text>

        </Paper>

      </Stack>
    </Container>
  );
};

export default HomePage;
