import ComingSoon from '@/components/coming-soon';

export default function AdminSettingsPage() {
  return (
    <ComingSoon
      title='Admin Settings'
      description='Global store configuration and payment gateway settings will be available here soon.'
      icon='settings'
      backLink='/admin/dashboard'
      backText='Back to Admin Dashboard'
    />
  );
}
