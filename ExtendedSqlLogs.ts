if (context.ControlId === 'button-exe') {
  const sites = Array.from(items.GetSiteByName('Logs'));
  extendedSql.ExecuteTable('BT', '{"SiteId": ' + sites[0].SiteId + '}');
}
