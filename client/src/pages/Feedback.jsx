import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';

const Feedback = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', profession: '', concern: '' });
  const dialogRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    dialogRef.current?.focus();
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success('Thank you for your feedback!');
    setFormData({ name: '', profession: '', concern: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onMouseDown={onClose}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="feedback-title" tabIndex={-1} onMouseDown={(event) => event.stopPropagation()} className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-8">
        <button type="button" onClick={onClose} aria-label="Close feedback form" className="absolute right-4 top-4 rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"><X className="h-5 w-5" /></button>
        <h2 id="feedback-title" className="pr-10 text-2xl font-bold text-primary">Send feedback</h2>
        <p className="mt-2 text-sm text-muted-foreground">Tell us what would make Jivaka better for you.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-foreground">Name<input name="name" value={formData.name} onChange={handleChange} required className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring" placeholder="Your name" /></label>
          <label className="block text-sm font-medium text-foreground">Profession<input name="profession" value={formData.profession} onChange={handleChange} required className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring" placeholder="Doctor, patient, hospital admin…" /></label>
          <label className="block text-sm font-medium text-foreground">Message<textarea name="concern" value={formData.concern} onChange={handleChange} required rows={4} className="mt-1.5 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring" placeholder="Write your feedback here…" /></label>
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={onClose} className="rounded-md px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted">Cancel</button><button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Submit feedback</button></div>
        </form>
      </section>
    </div>
  );
};

export default Feedback;
