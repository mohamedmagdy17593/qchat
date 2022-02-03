import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export interface Item {
  label: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
}

export type DropdownItems = Item[];

type DropdownProps = React.PropsWithChildren<{ items: DropdownItems }>;

export function Dropdown({ children, items }: DropdownProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        {children}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Content
        align="end"
        side="top"
        sideOffset={8}
        className="min-w-[220px] select-none rounded-md bg-white p-1 text-sm text-neutral-900 shadow"
      >
        {items.map((item, i) => {
          return (
            <DropdownMenuPrimitive.Item key={i}>
              <button
                className="flex w-full items-center gap-2 rounded px-2 py-2 hover:cursor-pointer hover:bg-neutral-100"
                onClick={item.onClick}
              >
                <span className="flex h-8 w-8 items-center justify-center text-xl">
                  {item.icon}
                </span>
                {item.label}
              </button>
            </DropdownMenuPrimitive.Item>
          );
        })}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Root>
  );
}
