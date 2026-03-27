import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from '@n8n/i18n';
import { N8nIcon } from '@n8n/design-system';
import { useUIStore } from '@/app/stores/ui.store';
import { WHATS_NEW_MODAL_KEY, VIEWS, ABOUT_MODAL_KEY } from '@/app/constants';
import { EXTERNAL_LINKS } from '@/app/constants/externalLinks';
import { useBugReporting } from '@/app/composables/useBugReporting';
import type { CommandGroup, CommandBarItem } from '../types';
import { CHAT_VIEW } from '@/features/ai/chatHub/constants';
import { useSettingsStore } from '@/app/stores/settings.store';
import { useProjectsStore } from '@/features/collaboration/projects/projects.store';
import { useTemplatesStore } from '@/features/workflows/templates/templates.store';

const ITEM_ID = {
	CHAT_HUB: 'chat-hub',
	WHATS_NEW: 'whats-new',
	SETTINGS: 'settings',
	SIGN_OUT: 'sign-out',
	TEMPLATES: 'templates',
	VARIABLES: 'variables',
	INSIGHTS: 'insights',
	QUICKSTART: 'quickstart',
	DOCUMENTATION: 'documentation',
	FORUM: 'forum',
	COURSE: 'course',
	REPORT_BUG: 'report-bug',
	ABOUT: 'about',
} as const;

export function useGenericCommands(): CommandGroup {
	const i18n = useI18n();
	const uiStore = useUIStore();
	const router = useRouter();
	const { getReportingURL } = useBugReporting();

	const genericCommands = computed<CommandBarItem[]>(() => [
		{
			id: ITEM_ID.ABOUT,
			title: i18n.baseText('mainSidebar.aboutN8n'),
			section: i18n.baseText('mainSidebar.help'),
			handler: () => {
				uiStore.openModal(ABOUT_MODAL_KEY);
			},
			icon: {
				component: N8nIcon,
				props: {
					icon: 'info',
				},
			},
			keywords: [i18n.baseText('mainSidebar.aboutN8n').toLowerCase()],
		},
		{
			id: ITEM_ID.SETTINGS,
			title: i18n.baseText('settings'),
			section: i18n.baseText('commandBar.sections.general'),
			handler: () => {
				void router.push({ name: VIEWS.SETTINGS });
			},
			icon: {
				component: N8nIcon,
				props: {
					icon: 'cog',
				},
			},
			keywords: [i18n.baseText('settings').toLowerCase()],
		},
		{
			id: ITEM_ID.SIGN_OUT,
			title: i18n.baseText('auth.signout'),
			section: i18n.baseText('commandBar.sections.general'),
			handler: () => {
				void router.push({ name: VIEWS.SIGNOUT });
			},
			icon: {
				component: N8nIcon,
				props: {
					icon: 'sign-out-alt',
				},
			},
			keywords: [i18n.baseText('auth.signout').toLowerCase()],
		},
	]);

	return {
		commands: genericCommands,
	};
}
