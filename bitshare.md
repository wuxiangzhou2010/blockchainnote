# bitshare

```cpp
#define GRAPHENE_DEFAULT_BLOCK_INTERVAL  5 /* seconds */
#define GRAPHENE_DEFAULT_MAINTENANCE_SKIP_SLOTS 3  // number of slots to skip for maintenance interval
#define GRAPHENE_DEFAULT_MAINTENANCE_INTERVAL  (60*60*24) // seconds, aka: 1 day

get_scheduled_witness()方法实现了获取指定时间槽的区块生产调度证人：

get_slot_at_time()方法主要是获取指定时间属于未来哪个时间槽：
get_slot_time()方法，获得未来的第n个区块生产时间槽的时刻
```

```json
{
  head_block_num: 29,974,850
  head_block_age: 2 seconds ago
  chain_id: 4018d784..dad512c8
  participation: 100%
  active_witnesses: 27
  committee_members: 11
  block_interval: 3 seconds
  maintenance_interval: 1 hour
  recently_missed_blocks: 0
  last_irreversible_block: 29,974,782
  powered_by: graphene
  more_info: bitshares.org
}
```

- `https://blog.csdn.net/ggq89/article/details/80188930`
- `https://blog.csdn.net/ggq89/article/details/80068306`
- `http://docs.bitshares.org/bitshares/dpos.html`
- `https://www.leiphone.com/news/201706/JfsBmaf6Y0ZtV11R.html`