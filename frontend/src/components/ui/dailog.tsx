

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { X } from 'lucide-react';
import cn from '../../../tailwindcss-config';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal

  // const DialogPortal = ({
  //   className,
  //   ...props
  // }: DialogPrimitive.DialogPortalProps) => (
  //   <DialogPrimitive.Portal className={cn(className)} {...props} />
  // );
  // DialogPortal.displayName = DialogPrimitive.Portal.displayName;

 const DialogOverlay=React.forwardRef<
 React.ElementRef<typeof DialogPrimitive.Overlay>,
 React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
 >(({className,...props}, ref)=>(
    <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/60 backdrop-blur-sm dark:bg-slate-950/80',
      className,
    )}
    {...props}
  />
 ))

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent=React.forwardRef<
      React.ElementRef<typeof DialogPrimitive.Content>,
      React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
        closeIconClassName?: string;
      }
>(({className, children, closeIconClassName, ...props},ref)=>(
  <DialogPortal>
    <DialogOverlay/>
    <DialogPrimitive.Content
    ref={ref}
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 dark:border-slate-800 dark:bg-slate-950 sm:rounded-lg',
      className
    )} {...props}
    >
      {children}
      <DialogPrimitive.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400'>
        <X className={cn('h-7 w-7', closeIconClassName)}/>
        <span className='sr-only'>Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))

DialogContent.displayName=DialogPrimitive.Content.displayName

const DialogHeader=({className,...props}:React.HTMLAttributes<HTMLDivElement>)=>(
  <div className={cn(
    "flex flex-col space-y-1.5 text-center sm:text-left",
  className)} 
  {...props}/>
)

DialogHeader.displayName = 'DialogHeader';

const DialogFooter=({className,...props}:React.HTMLAttributes<HTMLDivElement>)=>(
  <div className={cn(
    "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    className)} 
  {...props}
  />
)
DialogFooter.displayName='DialogFooter'

const DialogTitle=React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
  >(({className,...props})=>(
    <DialogPrimitive.Title
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
    />
))

DialogTitle.displayName=DialogPrimitive.Description.displayName

const DialogDescription=React.forwardRef<
      React.ElementRef<typeof DialogPrimitive.Description>,
      React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({className,...props})=>(
  <DialogPrimitive.Description
  className={cn(
    "text-sm text-slate-500 dark:text-slate-400",
    className
  )}
  {...props}
  />
))

DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};