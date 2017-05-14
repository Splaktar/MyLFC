﻿using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using HtmlAgilityPack;
using MyLiverpool.Business.Contracts;
using MyLiverpool.Data.Common;
using MyLiverpool.Data.Entities;
using MyLiverpool.Data.ResourceAccess.Interfaces;

namespace MyLiverpool.Business.Services
{
    public class AdminService : IAdminService
    {
        private const string Address = "http://www.sports.ru/epl/table/";
        private const string XpathTableRows = "/html/body/div/div/div/div/div/div/div/table/tbody//tr";
        private readonly IHelperEntityRepository _helperEntityRepository;

        public AdminService(IHelperEntityRepository helperEntityRepository)
        {
            _helperEntityRepository = helperEntityRepository;
        }

        public async Task<string> UpdateTableAsync()
        {
            var trNodes = await GetHtmlRowsAsync();
            var clubs = trNodes.Select(trNode => new
            {
                position = trNode.ChildNodes[1].InnerText,
                name = trNode.ChildNodes[3].InnerText,
                matches = trNode.ChildNodes[5].InnerText,
                won = trNode.ChildNodes[7].InnerText,
                draw = trNode.ChildNodes[9].InnerText,
                lost = trNode.ChildNodes[11].InnerText,
                goals = int.Parse(trNode.ChildNodes[13].InnerText) - int.Parse(trNode.ChildNodes[15].InnerText),
                points = trNode.ChildNodes[17].InnerText
            }).ToList();

            var newRows = new StringBuilder(
                @"<table class=""table table-condensed table-striped table-responsive col-xs-12 overflowable"">
    <thead>
        <tr>
            <th>#</th>
            <th>Команда</th>
            <th>И</th>
            <th>В</th>
            <th>Н</th>
            <th>П</th>
            <th>+/-</th>
            <th>О</th>
        </tr>
    </thead>
    <tbody>");
                foreach (var club in clubs)
                {
                    var goalsSign = club.goals > 0 ? "+" : "";
                    var isLiverpool = club.name.ToLower().Contains("ливерпуль");
                    var startTag = isLiverpool ? "<b>" : "";
                    var endTag = isLiverpool ? "</b>" : "";
                    var cssClass = isLiverpool ? " class=\"red-color\"" : "";
                    newRows.AppendLine($@"<tr{cssClass}>
                                        <td>{startTag}{club.position}{endTag}</td>
                                        <td>{startTag}{club.name}{endTag}</td>
                                        <td>{startTag}{club.matches}{endTag}</td>
                                        <td>{startTag}{club.won}{endTag}</td>
                                        <td>{startTag}{club.draw}{endTag}</td>
                                        <td>{startTag}{club.lost}{endTag}</td>
                                        <td>{startTag}{goalsSign}{club.goals}{endTag}</td>
                                        <td>{startTag}{club.points}{endTag}</td>
                                        </tr>");
                }
                newRows.Append("</tbody></table>");

            var entity = await _helperEntityRepository.GetByTypeAsync(HelperEntityType.EplTable) ?? new HelpEntity()
            {
                Type = HelperEntityType.EplTable
            };
            entity.Value = newRows.ToString();
            await _helperEntityRepository.UpdateAndSaveAsync(entity);
            return entity.Value;
        }
        
        private async Task<HtmlNodeCollection> GetHtmlRowsAsync()
        {
            var http = new HttpClient();
            var response = await http.GetByteArrayAsync(Address);
            var source = Encoding.GetEncoding("utf-8").GetString(response, 0, response.Length - 1);
            source = WebUtility.HtmlDecode(source);
            var resultat = new HtmlDocument();
            resultat.LoadHtml(source);

            var trNodes = resultat.DocumentNode.SelectNodes(XpathTableRows);
            return trNodes;
        }
    }
}
