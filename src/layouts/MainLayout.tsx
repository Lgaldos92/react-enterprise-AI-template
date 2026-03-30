import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, Burger, Group, Text, UnstyledButton, ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSun, IconMoon } from '@tabler/icons-react';


const MainLayout: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const isDark = computedColorScheme === 'dark';

  return (
    <AppShell
      header={{ height: 'var(--header-height)' }}
      navbar={{
        width: 'var(--navbar-width)',
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="var(--main-padding)"
    >
      <AppShell.Header bg="var(--surface-color)">
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text size="var(--font-title-md)" fw={700} c="var(--primary-color)">App Template</Text>
          </Group>
          <ActionIcon
            onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
            variant="default"
            size="lg"
            aria-label="Toggle color scheme"
          >
            {isDark ? <IconSun stroke={1.5} /> : <IconMoon stroke={1.5} />}
          </ActionIcon>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="var(--navbar-padding)" bg="var(--bg-color)">
        <UnstyledButton 
          onClick={() => { }} 
          style={{ 
            width: '100%', 
            padding: 'var(--spacing-sm)', 
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--surface-color)',
            border: '1px solid var(--border-color)'
          }}
        >
          <Text size="var(--font-sm)" fw={500}>Dashboard</Text>
        </UnstyledButton>
      </AppShell.Navbar>




      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
