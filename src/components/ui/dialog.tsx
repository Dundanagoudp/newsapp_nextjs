'use client';

import * as React from 'react';
import { Dialog as HeadlessDialog } from '@headlessui/react';

export function Dialog({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <HeadlessDialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <HeadlessDialog.Panel className="bg-white p-6 rounded-md shadow-lg w-96">
          {children}
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  );
}
