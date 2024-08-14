namespace VehicleVisualization.Server.Repositories.Redis
{
    public interface IRedisCacheService
    {
        Task SetCacheValueAsync(string key, string value);
        Task<string> GetCacheValueAsync(string key);
    }
}