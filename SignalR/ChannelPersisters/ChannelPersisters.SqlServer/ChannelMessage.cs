﻿using System.ComponentModel.DataAnnotations;

namespace Tribe.SignalR.ChannelPersisters.SqlServer.Model
{
    public class ChannelMessage
    {
        [Key] public int Id { get; set; }
        public string ChannelId { get; set; }
        public string Message { get; set; }
    }
}
