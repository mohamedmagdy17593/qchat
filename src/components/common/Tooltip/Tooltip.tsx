import React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';

type TooltipProps = React.PropsWithChildren<{ content: React.ReactNode }>;

function Tooltip({ children, content }: TooltipProps) {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Content
        sideOffset={8}
        className="rounded bg-neutral-800 px-2 py-0.5 text-sm text-neutral-300 shadow"
      >
        {content}
      </RadixTooltip.Content>
    </RadixTooltip.Root>
  );
}

export default Tooltip;
