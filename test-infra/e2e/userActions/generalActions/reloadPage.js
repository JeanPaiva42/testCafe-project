import { t } from 'testcafe'

export const reloadPage = async () => {
    await t.eval(() => location.reload());
}
