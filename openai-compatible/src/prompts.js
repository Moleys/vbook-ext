var TRANSLATION_PROMPT_TABLE = "translation_prompts";
var TRANSLATION_PROMPT_SCOPE = "";
var TRANSLATION_CONFIG_GENERATION_KEY = "translation_config_generation";

function translationConfigGeneration() {
    var value = 0;
    try {
        value = parseInt(localStorage.getItem(TRANSLATION_CONFIG_GENERATION_KEY), 10);
    } catch (e) {}
    return isNaN(value) || value < 0 ? 0 : value;
}

function translationConfigKey(key) {
    var generation = translationConfigGeneration();
    return generation > 0 ? "g" + generation + "_" + key : key;
}

function translationNextConfigGeneration() {
    var generation = translationConfigGeneration() + 1;
    localStorage.setItem(TRANSLATION_CONFIG_GENERATION_KEY, String(generation));
    return generation;
}

function translationNormalizeStyle(style) {
    var selected = String(style || "").trim();
    return selected || "huyen-huyen";
}

function translationBookPromptConfigKey(bookId) {
    var value = String(bookId || "");
    if (!value) return "";

    var suffix = "";
    for (var i = 0; i < value.length; i++) {
        var hex = value.charCodeAt(i).toString(16);
        while (hex.length < 4) hex = "0" + hex;
        suffix += hex;
    }
    return "custom_instruction_book_" + suffix;
}

function translationDefaultPrompts() {
    var prompts = {};
    var definitions = translationDefaultStyleDefinitions();
    for (var i = 0; i < definitions.length; i++) {
        prompts[definitions[i].id] = translationBuildPrompt(definitions[i].rule);
    }
    return prompts;
}

function translationDefaultSystemPrompt() {
    return "Bạn là biên tập viên kiêm dịch giả văn học chuyên nghiệp. " +
        "Hãy dịch toàn bộ văn bản người dùng từ {source_language} sang {target_language}, tạo bản dịch hoàn chỉnh, tự nhiên, phù hợp để đọc lâu và nghe TTS.\n" +
        "Thứ tự ưu tiên: (1) giữ nguyên nội dung, diễn biến và logic của nguyên tác; " +
        "(2) tuân thủ bộ nhớ dịch đã cung cấp; " +
        "(3) thực hiện yêu cầu riêng của truyện; " +
        "(4) giữ đúng nhân vật, giới tính, quan hệ, xưng hô hai chiều, tên riêng và thuật ngữ; " +
        "(5) áp dụng phong cách thể loại và yêu cầu theo loại nội dung.\n" +
        "Không dịch từng chữ khi câu trở nên cứng hoặc tối nghĩa. Có thể đổi cấu trúc câu để bản dịch tự nhiên nhưng không thêm, bớt, giải thích hoặc suy diễn. " +
        "Không tự đoán giới tính, tuổi, quan hệ hoặc vai vế; khi chưa rõ, dùng tên, danh hiệu hoặc cách diễn đạt trung tính. " +
        "Trong lời thoại, xác định đúng người nói, người nghe và từng vai xưng hô. Một tên hoặc thuật ngữ đã có cách dịch phải được giữ nhất quán. " +
        "Dịch đầy đủ mọi đoạn, kể cả câu ngắn và tên gọi; giữ nguyên số liệu, URL, placeholder cùng cấu trúc HTML/Markdown.\n\n" +
        "{style_prompt}\n\n" +
        "{source_prompt}\n\n" +
        "{custom_instruction}\n\n" +
        "{memory_prompt}\n\n" +
        "Trước khi hoàn tất, hãy tự kiểm tra im lặng: còn phần nào chưa dịch ngoài nội dung được yêu cầu giữ nguyên không; tên, giới tính, quan hệ, xưng hô và thuật ngữ có nhất quán không; có vô tình thêm hoặc bỏ thông tin không.\n" +
        "Chỉ trả về bản dịch, không giải thích, không thêm nhãn, dấu ngoặc kép hoặc hàng rào Markdown.";
}

function translationDefaultStyleDefinitions() {
    return [
        {
            id: "tu-nhien",
            name: "Tự nhiên",
            description: "Dùng cho mọi ngôn ngữ nguồn và đích; mặc định khi nguyên tác không phải tiếng Trung",
            rule: "PHONG CÁCH TỰ NHIÊN (MỌI NGÔN NGỮ):\n" +
                "- Viết bằng {target_language} chuẩn, tự nhiên như sách xuất bản trong ngôn ngữ đó; ưu tiên câu rõ nghĩa, đúng ngữ pháp và nhịp đọc trôi chảy.\n" +
                "- Giữ bối cảnh văn hóa của nguyên tác: không bản địa hóa tên người, địa danh, món ăn, tiền tệ hay phong tục sang văn hóa của ngôn ngữ đích.\n" +
                "- Tên riêng giữ nguyên hoặc phiên âm theo quy ước phổ biến của ngôn ngữ đích; một tên đã chọn cách viết phải nhất quán.\n" +
                "- Xưng hô, kính ngữ và mức độ trang trọng phải phản ánh đúng quan hệ, tuổi và địa vị trong nguyên tác, dùng phương tiện tương đương của ngôn ngữ đích.\n" +
                "- Thành ngữ, chơi chữ và tiếng lóng dịch theo ý tương đương; không dịch từng chữ khi làm câu tối nghĩa và không thêm giải thích."
        },
        {
            id: "huyen-huyen",
            name: "Huyền huyễn",
            description: "Tiên hiệp, tu chân, huyền huyễn và cổ phong Trung Quốc",
            rule: "THỂ LOẠI HUYỀN HUYỄN / TIÊN HIỆP / TU CHÂN:\n" +
                "- Giữ không khí tu chân, thần thoại và cổ phong nhưng câu kể, động từ và lời thoại thông thường vẫn phải là tiếng Việt tự nhiên; không Hán Việt hóa cưỡng ép.\n" +
                "- Cảnh giới, công pháp, pháp bảo, thần thông, tông môn, bí cảnh, trận pháp, chiêu thức và danh hiệu phải ngắn gọn, đúng sắc thái và nhất quán. Phân biệt tên riêng với mô tả nhất thời; không tự biến một vật được mô tả thành danh xưng viết hoa.\n" +
                "- Thành ngữ, cố ngữ và điển cố dùng dạng Hán Việt quen thuộc khi độc giả phổ thông hiểu được; nếu không, diễn đạt tự nhiên theo đúng ý.\n" +
                "- Xưng hô phải theo giới tính, tuổi, sư môn, vai vế và quan hệ: sư phụ/đệ tử, sư huynh/sư đệ, tiền bối/vãn bối, tại hạ/các hạ... Không suy tuổi từ cảnh giới hay danh hiệu; không tự gọi nhân vật là lão, ông, bà hoặc thiếu niên.\n" +
                "- Phân biệt tu vi, cảnh giới, huyết mạch, thể chất, linh căn và thân phận; không gộp các hệ thống khác nhau. Khi lời thoại có nhiều vai, giữ đúng người nói, người nghe và đối tượng được nhắc tới."
        },
        {
            id: "kiem-hiep",
            name: "Kiếm hiệp",
            description: "Võ lâm, giang hồ, môn phái và võ công",
            rule: "THỂ LOẠI KIẾM HIỆP / VÕ LÂM:\n" +
                "- Giữ chất giang hồ và cổ phong vừa phải, ưu tiên tiếng Việt sáng nghĩa. Không tự biến nội lực, chân khí, kinh mạch và võ học thành hệ thống tu tiên; không thêm cảnh giới, linh căn, pháp bảo hoặc thiên kiếp nếu nguyên tác không có.\n" +
                "- Tên môn phái, bang hội, võ công, chiêu thức, tâm pháp, binh khí, địa danh và biệt hiệu dùng Hán Việt quen thuộc, cô đọng và nhất quán. Phân biệt chiêu thức có tên với mô tả một động tác thông thường.\n" +
                "- Xưng hô theo vai vế võ lâm, tuổi, môn phái và quan hệ: tại hạ/các hạ, tiền bối/vãn bối, chưởng môn, bang chủ, sư phụ, sư huynh/sư đệ... Không mặc định người võ công cao là già.\n" +
                "- Cảnh giao đấu phải rõ người ra chiêu, mục tiêu, phương vị, binh khí, biến hóa và kết quả; giữ nhịp nhanh nhưng không lược mất thế đánh hoặc nguyên nhân thắng thua.\n" +
                "- Thành ngữ và điển cố ưu tiên cách Việt/Hán Việt quen thuộc; không dịch từng chữ và không dùng từ cổ hiếm chỉ để tạo vẻ kiếm hiệp."
        },
        {
            id: "khoa-huyen",
            name: "Khoa huyễn",
            description: "Khoa học viễn tưởng, cơ giáp, tinh tế và mạt thế công nghệ",
            rule: "THỂ LOẠI KHOA HUYỄN:\n" +
                "- Dùng tiếng Việt hiện đại, chính xác và sáng rõ; không đưa giọng tiên hiệp/cổ trang vào công nghệ nếu nguyên tác không pha trộn thể loại.\n" +
                "- Giữ riêng biệt AI, hệ thống, robot, máy tính, trợ lý ảo; cơ giáp, chiến hạm, phi thuyền, drone và vũ khí. Thuật ngữ khoa học, quân hàm, tổ chức, chủng tộc, hành tinh, tinh vực, đơn vị đo và cấp sức mạnh phải nhất quán.\n" +
                "- Số liệu, tọa độ, thời gian, mã hiệu, giao diện, cảnh báo và thông báo hệ thống phải chính xác, gọn, không tự quy đổi.\n" +
                "- Hội thoại quân đội và chỉ huy ngắn, dứt khoát, đúng cấp bậc; hội thoại đời thường vẫn tự nhiên. Không đoán giới tính hoặc tuổi từ chức vụ như đô đốc, giáo sư hay thuyền trưởng.\n" +
                "- Cảnh chiến đấu và du hành phải giữ rõ chủ thể, phương tiện, vị trí, trình tự hành động và quan hệ nhân quả."
        },
        {
            id: "do-thi",
            name: "Đô thị",
            description: "Đời sống hiện đại, công sở, gia đình và xã hội",
            rule: "THỂ LOẠI ĐÔ THỊ HIỆN ĐẠI:\n" +
                "- Dùng tiếng Việt hiện đại, đời thường, mạch lạc; tuyệt đối không trộn xưng hô cổ trang như ta/ngươi, huynh/muội, phụ thân/mẫu thân nếu nguyên tác không cố ý.\n" +
                "- Xưng hô dựa trên tuổi, quan hệ, địa vị, mức thân thiết và hoàn cảnh công việc/gia đình/riêng tư. Chức vụ cao không đồng nghĩa với lớn tuổi; chưa rõ thì dùng tên hoặc chức danh trung tính.\n" +
                "- Giữ đúng chức vụ, công ty, trường học, bệnh viện, pháp luật, mạng xã hội, thương hiệu, tiền tệ và địa danh Trung Quốc; không Việt hóa bối cảnh hay tự nâng hạ địa vị nhân vật.\n" +
                "- Hội thoại phải giống người thật, phù hợp tính cách và nghề nghiệp. Giữ đúng điểm thay đổi xưng hô khi quan hệ trở nên gần gũi, xa cách hoặc đối đầu.\n" +
                "- Loại dấu vết dịch máy và cấu trúc tiếng Trung nhưng không rút mất dữ kiện, hàm ý xã hội hay sắc thái mỉa mai."
        },
        {
            id: "fantasy",
            name: "Fantasy",
            description: "Kỳ ảo phương Tây, ma pháp, chủng tộc và phiêu lưu",
            rule: "THỂ LOẠI FANTASY:\n" +
                "- Giữ chất kỳ ảo và tầng giọng của thế giới: đời thường, trung cổ, quý tộc hoặc sử thi; không tự chuyển sang văn phong tiên hiệp Trung Quốc.\n" +
                "- Nhất quán tên người, chủng tộc, quốc gia, lãnh địa, giáo hội, bang hội, học viện, chức nghiệp, ma pháp, kỹ năng, vật phẩm, quái vật và hệ thống sức mạnh. Một khái niệm đã chọn cách dịch thì không đổi đồng nghĩa tùy hứng.\n" +
                "- Tước vị và xưng hô phải theo quan hệ, địa vị, chủng tộc và nghi thức; vua, nữ hoàng, hiệp sĩ hay đại pháp sư không tự động là người già.\n" +
                "- Tên phương Tây ưu tiên cách phiên âm hoặc giữ nguyên đã được bộ nhớ xác nhận; không Hán Việt hóa tên và thuật ngữ không thuộc văn hóa Trung Quốc.\n" +
                "- Cảnh phép thuật và chiến đấu phải rõ ai thi triển, mục tiêu, hiệu ứng, giới hạn và thứ tự hành động; không tự thêm năng lực hoặc giải thích hệ thống."
        },
        {
            id: "light-novel",
            name: "Light Novel",
            description: "Light Novel Nhật, học đường, isekai và đời thường",
            rule: "THỂ LOẠI LIGHT NOVEL:\n" +
                "- Văn phong trẻ, nhẹ, dễ đọc; đối thoại có nhịp tự nhiên, nội tâm gần gũi, giữ đúng chất hài, ngượng ngùng, châm biếm hoặc nghiêm túc của nguyên tác. Không biến mọi câu thành tiếng lóng.\n" +
                "- Xưng hô theo tuổi, quan hệ, mức thân thiết và tính cách. Giữ chính xác điểm đổi từ họ sang tên, biệt danh hoặc cách gọi thân mật vì đó thường là dấu hiệu phát triển quan hệ.\n" +
                "- Kính ngữ và hậu tố Nhật như -san, -sama, -kun, -chan, senpai chỉ giữ khi mang ý nghĩa quan hệ; áp dụng nhất quán, không vừa giữ hậu tố vừa dịch lặp nghĩa.\n" +
                "- Tên người, trường học, câu lạc bộ, kỹ năng, chức nghiệp, cấp độ, giao diện hệ thống và thuật ngữ isekai/fantasy phải nhất quán; không đổi bối cảnh Nhật thành Việt Nam.\n" +
                "- Không tự thêm romance, fanservice, lời đùa hoặc phản ứng cường điệu hơn nguyên tác."
        },
        {
            id: "ngon-tinh-hien-dai",
            name: "Ngôn tình hiện đại",
            description: "Tình cảm hiện đại, học đường, công sở và hào môn",
            rule: "THỂ LOẠI NGÔN TÌNH HIỆN ĐẠI:\n" +
                "- Văn phong mềm, giàu cảm xúc vừa đủ nhưng không sến và không hoa mỹ hơn nguyên tác. Giữ nguyên nội tâm, tính cách, khoảng cách và những cảm xúc chưa nói thành lời.\n" +
                "- Theo dõi đúng từng giai đoạn quan hệ: xa lạ, quen biết, thân thiết, rung động, yêu, xung đột, xa cách, hòa giải. Không biến thiện cảm thành tình yêu, khó chịu thành ghen hoặc quan tâm thành chiếm hữu.\n" +
                "- Xưng hô hiện đại phải đổi đúng thời điểm: tôi/anh, tôi/cô, tớ/cậu, anh/em, gọi họ/tên/biệt danh. Không mặc định tổng tài là ông già, nam chính là bá đạo hoặc nữ chính là yếu đuối.\n" +
                "- Giữ mọi chi tiết tạo chemistry đã có như ánh mắt, im lặng, cử chỉ, khoảng cách và cách gọi tên, nhưng không tự thêm thân mật, tình dục hay lời tán tỉnh.\n" +
                "- Chức vụ, gia đình, hào môn, công sở, thương hiệu, mạng xã hội, địa danh và tiền tệ phải đúng và nhất quán."
        },
        {
            id: "ngon-tinh-co-dai",
            name: "Ngôn tình cổ đại",
            description: "Cổ phong, cung đấu, gia đấu và tình cảm cổ đại",
            rule: "THỂ LOẠI NGÔN TÌNH CỔ ĐẠI:\n" +
                "- Dùng văn phong cổ phong nhẹ, thanh nhã và dễ đọc; không biến thành văn ngôn tối nghĩa, không trộn từ hiện đại lộ liễu và không hoa mỹ hơn nguyên tác.\n" +
                "- Xưng hô phải theo giới tính, thân phận, cấp bậc, quan hệ, nơi chốn và tâm trạng. Trẫm, thần, ai gia, bổn cung, thần thiếp, nô tỳ, thuộc hạ, công tử, cô nương... chỉ dùng đúng người và đúng hoàn cảnh.\n" +
                "- Giữ chính xác thời điểm đổi thân phận và cách gọi: được phong, bị giáng, thành thân, vào cung, công khai hay riêng tư. Không đổi sớm tiến triển tình cảm hoặc tự thêm chemistry.\n" +
                "- Chức quan, tước vị, phẩm cấp, lễ nghi, cung điện, phủ đệ, quan hệ họ hàng, tiền tệ và đơn vị cổ phải nhất quán; không Việt hóa văn hóa Trung Quốc.\n" +
                "- Với xuyên không/trọng sinh, phân biệt rõ nội tâm hiện đại với lời nói cổ đại, tên và thân phận trước/sau; không làm lộ thông tin nguyên tác chưa tiết lộ."
        },
        {
            id: "lich-su-quan-su",
            name: "Lịch sử - Quân sự",
            description: "Lịch sử, chiến tranh, triều chính và tranh quyền",
            rule: "THỂ LOẠI LỊCH SỬ / QUÂN SỰ / TRIỀU CHÍNH:\n" +
                "- Giữ đúng bối cảnh thời đại, thiết chế, lễ nghi, chức quan, tước vị, quân hàm, binh chủng, địa danh, niên hiệu, tiền tệ và đơn vị. Không hiện đại hóa tư duy, lời nói hoặc khái niệm nếu nguyên tác không chủ ý.\n" +
                "- Phân biệt lời chiếu, tấu, quân lệnh, báo cáo, nghị sự và hội thoại riêng; mỗi loại cần mức trang trọng phù hợp nhưng vẫn dễ hiểu, không biến thành văn ngôn nặng nề.\n" +
                "- Cảnh chiến trận phải giữ rõ phe, tướng, quân số, đội hình, địa hình, hướng tiến công, chuỗi mệnh lệnh và quan hệ nhân quả. Không tự sửa chiến thuật hoặc hợp lý hóa sai lầm của nhân vật.\n" +
                "- Xưng hô theo địa vị và hoàn cảnh công khai/riêng tư; cùng một người có thể xưng khác trước vua, thuộc hạ, gia đình và kẻ địch. Không suy tuổi hoặc giới tính từ chức vụ.\n" +
                "- Nếu là lịch sử giả tưởng, giữ hệ thống riêng của tác phẩm; nếu nhắc nhân vật/sự kiện có thật, không tự bổ sung kiến thức ngoài văn bản."
        },
        {
            id: "trinh-tham-kinh-di",
            name: "Trinh thám - Kinh dị",
            description: "Phá án, tâm lý, huyền nghi và kinh dị",
            rule: "THỂ LOẠI TRINH THÁM / HUYỀN NGHI / KINH DỊ:\n" +
                "- Bảo toàn tuyệt đối manh mối, thời gian, địa điểm, vật chứng, lời khai, điểm nhìn và mức độ hiểu biết của từng nhân vật. Không giải thích hộ, không sửa chi tiết tưởng như mâu thuẫn và không làm lộ đáp án sớm.\n" +
                "- Phân biệt sự kiện thật, suy luận, giả thuyết, lời nói dối, ký ức, giấc mơ và ảo giác. Các từ chỉ khả năng như có lẽ, dường như, chắc chắn phải giữ đúng mức độ.\n" +
                "- Thuật ngữ pháp y, y khoa, pháp luật, điều tra và tâm lý dùng chính xác, nhất quán; không tự bịa thuật ngữ hoặc tăng độ chắc chắn của kết luận.\n" +
                "- Nhịp văn có thể căng, lạnh hoặc ám ảnh theo nguyên tác. Cảnh kinh dị phải rõ cảm giác và không gian nhưng không tự thêm máu me, hù dọa hoặc yếu tố siêu nhiên.\n" +
                "- Đối thoại thẩm vấn phải giữ hàm ý, né tránh, mỉa mai và khoảng im lặng; không viết lại thành lời thú nhận trực tiếp."
        },
        {
            id: "vo-han-luu",
            name: "Vô hạn lưu - Sinh tồn",
            description: "Phó bản, quy tắc, luân hồi và sinh tồn",
            rule: "THỂ LOẠI VÔ HẠN LƯU / PHÓ BẢN / SINH TỒN:\n" +
                "- Giữ chính xác quy tắc, điều kiện kích hoạt, nhiệm vụ, thời hạn, điểm số, đạo cụ, kỹ năng, hình phạt và thông báo hệ thống. Không diễn giải thêm một quy tắc chưa được xác nhận và không làm lộ cơ chế ẩn.\n" +
                "- Phân biệt thế giới thật, không gian trung chuyển, phó bản, hồi ức, mô phỏng và ảo giác; giữ rõ người chơi, NPC, quái vật, hệ thống và vai trò bí mật.\n" +
                "- Duy trì trình tự thời gian, vị trí nhân vật, tài nguyên còn lại và quan hệ nhân quả của lựa chọn. Không bỏ chi tiết nhỏ có thể là manh mối sống còn.\n" +
                "- Giao diện, bảng trạng thái và thông báo trình bày gọn, nhất quán; bảo toàn số liệu, ký hiệu, cấp bậc và placeholder.\n" +
                "- Nhịp nhanh ở cảnh truy đuổi/chiến đấu, chậm và rõ ở đoạn suy luận quy tắc; không tự tăng sự thông minh hoặc ngu ngốc của nhân vật để làm câu chuyện hợp lý hơn."
        },
        {
            id: "game-he-thong",
            name: "Game - Hệ thống",
            description: "Game online, eSports, hệ thống và số liệu",
            rule: "THỂ LOẠI GAME / ESPORTS / HỆ THỐNG:\n" +
                "- Tách rõ lời kể, hội thoại, chat, thông báo hệ thống, nhiệm vụ, bảng trạng thái, mô tả kỹ năng và bình luận trận đấu. Giữ nguyên bố cục, số liệu, phím tắt, mã vật phẩm và placeholder.\n" +
                "- Tên game, server, đội tuyển, nghề nghiệp, class, kỹ năng, buff/debuff, trang bị, phẩm chất, cấp độ, chỉ số và tiền tệ phải nhất quán. Chỉ Việt hóa thuật ngữ khi có cách dùng tự nhiên và đã chọn một cách cố định.\n" +
                "- Phân biệt người chơi với nhân vật trong game, tên thật với nickname, thế giới thật với game và lời hệ thống với suy nghĩ nhân vật.\n" +
                "- Cảnh thi đấu phải rõ thao tác, chiến thuật, thời điểm và kết quả; không tự đổi cơ chế game hoặc rút gọn số liệu làm mất logic. Bình luận viên, tuyển thủ và khán giả có giọng riêng.\n" +
                "- Thuật ngữ phổ biến như tank, DPS, buff, debuff, boss có thể giữ nếu tự nhiên; không pha tiếng Anh vô cớ hoặc dịch máy thành cụm khó hiểu."
        },
        {
            id: "dien-van-chua-lanh",
            name: "Điền văn - Chữa lành",
            description: "Đời thường, gia đình, ẩm thực và trưởng thành",
            rule: "THỂ LOẠI ĐIỀN VĂN / ĐỜI THƯỜNG / CHỮA LÀNH:\n" +
                "- Văn phong ấm, trong và chậm vừa phải; giữ sức nặng của những chi tiết nhỏ trong sinh hoạt, lao động, gia đình và tình cảm. Không tự làm câu văn sến, triết lý hoặc kịch tính hơn nguyên tác.\n" +
                "- Xưng hô gia đình và làng xóm phải đúng thế hệ, tuổi, quan hệ họ hàng và mức thân thiết. Không nhập nhầm vai vế; tên món ăn, nông cụ, cây trồng, nghề thủ công và tập quán dùng từ dễ hiểu, nhất quán.\n" +
                "- Cảnh nấu ăn, trồng trọt, kinh doanh hoặc xây dựng giữ đủ nguyên liệu, thao tác, số lượng, thời gian và kết quả; không thêm kiến thức hay sửa quy trình ngoài nguyên tác.\n" +
                "- Giữ sự phát triển cảm xúc từ hành động và đối thoại; không biến quan tâm thành tình yêu, tổn thương thành bi kịch hoặc chữa lành thành lời giáo huấn.\n" +
                "- Hài hước và đáng yêu chỉ giữ ở nơi nguyên tác có; không trẻ con hóa nhân vật hoặc lạm dụng từ ngữ dễ thương."
        },
        {
            id: "ta-dao",
            name: "Tà thư",
            description: "Kỳ dị, u tối, kinh dị hoặc châm biếm đen",
            rule: "THỂ LOẠI TÀ THƯ / KỲ DỊ U TỐI:\n" +
                "- Giữ đúng không khí tà dị, kinh dị, bất an, châm biếm đen hoặc phi lý của nguyên tác; không làm nhẹ thành hài và không tự tăng mức ghê rợn, bạo lực hay thân mật.\n" +
                "- Không tô đẹp nhân vật, hợp lý hóa hành vi hoặc thêm phán xét đạo đức. Giữ ranh giới rõ giữa lời kể, ảo giác, ký ức, lời nói dối và sự kiện thực.\n" +
                "- Tên nghi thức, cấm thuật, giáo phái, quái vật, dị vật, quy tắc sinh tồn và biểu tượng phải nhất quán; câu đố, manh mối và điều cấm không được diễn giải thêm làm lộ bí mật.\n" +
                "- Xưng hô vẫn dựa trên dữ liệu nhân vật và quan hệ thực tế. Giọng văn có thể lạnh, gãy hoặc ám ảnh khi nguyên tác như vậy, nhưng bản dịch phải rõ nghĩa và phù hợp TTS."
        }
    ];
}

function translationDefaultPrompt(style) {
    var prompts = translationDefaultPrompts();
    return prompts[translationNormalizeStyle(style)] || prompts["huyen-huyen"];
}

function translationBuildPrompt(styleRule) {
    return styleRule;
}

function translationLegacyPrompt(styleRule) {
    return "Bạn là biên tập viên kiêm dịch giả truyện chuyên nghiệp. " +
        "Hãy tạo bản dịch tiếng Việt hoàn chỉnh, tự nhiên, phù hợp để đọc lâu và nghe TTS.\n" +
        "Thứ tự ưu tiên: (1) giữ nguyên nội dung, diễn biến và logic; " +
        "(2) tuân thủ bộ nhớ dịch đã cung cấp; " +
        "(3) giữ đúng nhân vật, giới tính, quan hệ và xưng hô hai chiều; " +
        "(4) thống nhất tên riêng, địa danh, tổ chức, danh hiệu và thuật ngữ; " +
        "(5) áp dụng phong cách bên dưới.\n" +
        "Không dịch máy từng chữ khi câu trở nên cứng hoặc tối nghĩa. Có thể đổi cấu trúc câu để tiếng Việt tự nhiên nhưng không thêm, bớt, giải thích hay suy diễn. " +
        "Không tự đoán giới tính, tuổi, quan hệ hoặc vai vế; khi chưa rõ hãy dùng tên, danh hiệu hoặc cách diễn đạt trung tính. " +
        "Trong lời thoại phải xác định đúng người nói, người nghe và từng vai xưng hô; không gộp nhầm ngôi thứ nhất với ngôi thứ hai khi sửa câu lặp. " +
        "Một tên hoặc thuật ngữ đã có cách dịch phải giữ nguyên ở mọi lần xuất hiện. " +
        "Dịch đầy đủ mọi đoạn, kể cả câu ngắn, tên gọi và chữ Hán xen giữa; giữ nguyên số liệu, URL, placeholder và cấu trúc HTML/Markdown.\n" +
        "Phong cách: " + styleRule + "\n" +
        "Trước khi hoàn tất, tự kiểm tra im lặng: có dịch sót không; có còn chữ Hán không; tên, giới tính, quan hệ, xưng hô và thuật ngữ có nhất quán với bộ nhớ không; có vô tình thêm hoặc bỏ thông tin không."
}


// --- Language helpers shared by translate.js, analyze-memory.js and config.js ---

var TRANSLATION_LANGUAGE_NAMES = {
    "zh": "tiếng Trung", "zh-CN": "tiếng Trung giản thể", "zh-TW": "tiếng Trung phồn thể",
    "en": "tiếng Anh", "vi": "tiếng Việt", "ja": "tiếng Nhật", "ko": "tiếng Hàn",
    "hi": "tiếng Hindi", "ar": "tiếng Ả Rập", "ru": "tiếng Nga", "de": "tiếng Đức",
    "fr": "tiếng Pháp", "es": "tiếng Tây Ban Nha", "pt": "tiếng Bồ Đào Nha", "it": "tiếng Ý",
    "tr": "tiếng Thổ Nhĩ Kỳ", "id": "tiếng Indonesia", "th": "tiếng Thái", "af": "tiếng Afrikaans",
    "sq": "tiếng Albania", "hy": "tiếng Armenia", "az": "tiếng Azerbaijan", "eu": "tiếng Basque",
    "be": "tiếng Belarus", "bn": "tiếng Bengal", "bs": "tiếng Bosnia", "hr": "tiếng Croatia",
    "cs": "tiếng Séc", "da": "tiếng Đan Mạch", "nl": "tiếng Hà Lan", "et": "tiếng Estonia",
    "fil": "tiếng Filipino", "fi": "tiếng Phần Lan", "gl": "tiếng Galicia", "ka": "tiếng Gruzia",
    "el": "tiếng Hy Lạp", "gu": "tiếng Gujarat", "he": "tiếng Do Thái", "hu": "tiếng Hungary",
    "is": "tiếng Iceland", "ga": "tiếng Ireland", "kn": "tiếng Kannada", "kk": "tiếng Kazakh",
    "lv": "tiếng Latvia", "lt": "tiếng Litva", "mk": "tiếng Macedonia", "ms": "tiếng Mã Lai",
    "ml": "tiếng Malayalam", "mr": "tiếng Marathi", "mn": "tiếng Mông Cổ", "ne": "tiếng Nepal",
    "no": "tiếng Na Uy", "fa": "tiếng Ba Tư", "pl": "tiếng Ba Lan", "pa": "tiếng Punjab",
    "ro": "tiếng Romania", "sr": "tiếng Serbia", "sk": "tiếng Slovakia", "sl": "tiếng Slovenia",
    "sw": "tiếng Swahili", "sv": "tiếng Thụy Điển", "ta": "tiếng Tamil", "te": "tiếng Telugu",
    "uk": "tiếng Ukraina", "ur": "tiếng Urdu", "uz": "tiếng Uzbek", "cy": "tiếng Wales"
};

function translationLanguageName(code) {
    var value = String(code || "");
    if (!value || value === "auto") return "ngôn ngữ nguồn được tự động nhận diện";
    var name = TRANSLATION_LANGUAGE_NAMES[value];
    return name ? name + " (" + value + ")" : value;
}

// Script ranges used to tell what a text is written in. Han is listed after kana so
// Japanese (kana mixed with kanji) is recognised as kana.
var TRANSLATION_SCRIPTS = {
    kana: /[\u3040-\u30ff\u31f0-\u31ff]/g,
    hangul: /[\uac00-\ud7af\u1100-\u11ff\u3130-\u318f]/g,
    han: /[\u3400-\u9fff\uf900-\ufaff]/g,
    cyrillic: /[\u0400-\u04ff]/g,
    arabic: /[\u0600-\u06ff\u0750-\u077f]/g,
    hebrew: /[\u0590-\u05ff]/g,
    greek: /[\u0370-\u03ff]/g,
    thai: /[\u0e00-\u0e7f]/g,
    devanagari: /[\u0900-\u097f]/g,
    bengali: /[\u0980-\u09ff]/g,
    latin: /[A-Za-z\u00c0-\u024f\u1e00-\u1eff]/g
};

var TRANSLATION_LANGUAGE_SCRIPTS = {
    "zh": "han", "zh-CN": "han", "zh-TW": "han", "ja": "kana", "ko": "hangul",
    "ru": "cyrillic", "uk": "cyrillic", "be": "cyrillic", "mk": "cyrillic", "sr": "cyrillic",
    "kk": "cyrillic", "mn": "cyrillic", "ar": "arabic", "fa": "arabic", "ur": "arabic",
    "he": "hebrew", "el": "greek", "th": "thai", "hi": "devanagari", "mr": "devanagari",
    "ne": "devanagari", "bn": "bengali", "hy": "armenian", "ka": "georgian", "gu": "gujarati",
    "pa": "gurmukhi", "ta": "tamil", "te": "telugu", "kn": "kannada", "ml": "malayalam"
};

function translationCountScript(text, script) {
    var pattern = TRANSLATION_SCRIPTS[script];
    if (!pattern) return 0;
    var matches = String(text || "").match(pattern);
    return matches ? matches.length : 0;
}

function translationDominantScript(text) {
    var value = String(text || "");
    var kana = translationCountScript(value, "kana");
    var han = translationCountScript(value, "han");
    if (kana > 0 && kana * 10 >= han) return "kana";
    var best = "";
    var bestCount = 0;
    for (var script in TRANSLATION_SCRIPTS) {
        if (!TRANSLATION_SCRIPTS.hasOwnProperty(script) || script === "kana") continue;
        var count = translationCountScript(value, script);
        if (count > bestCount) {
            best = script;
            bestCount = count;
        }
    }
    return best;
}

function translationLanguageScript(code) {
    return TRANSLATION_LANGUAGE_SCRIPTS[String(code || "")] || "latin";
}

function translationLooksVietnamese(text) {
    var value = String(text || "");
    var letters = translationCountScript(value, "latin");
    if (letters < 20) return false;
    var marks = value.match(/[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹĂÂĐÊÔƠƯ]/g);
    return (marks ? marks.length : 0) >= letters * 0.03;
}

function translationIsChineseLanguage(code) {
    var value = String(code || "").toLowerCase();
    return value === "zh" || value.indexOf("zh-") === 0;
}

function translationIsChineseSource(text, from) {
    if (translationIsChineseLanguage(from)) return true;
    if (String(from || "auto") !== "auto") return false;
    return translationDominantScript(text) === "han";
}

// True only when the text is known to be in a different language than `to`, so checks
// that compare source and output (untranslated detection, memory) cannot misfire on a
// book that is already written in the target language.
function translationSourceDiffers(text, from, to) {
    var source = String(from || "auto");
    var target = String(to || "");
    if (!target) return false;
    if (source !== "auto") {
        if (translationIsChineseLanguage(source) && translationIsChineseLanguage(target)) return false;
        return source !== target;
    }
    var script = translationDominantScript(text);
    if (!script) return false;
    var targetScript = translationLanguageScript(target);
    if (script !== "latin" || targetScript !== "latin") return script !== targetScript;
    var vietnamese = translationLooksVietnamese(text);
    if (target === "vi") return !vietnamese;
    return vietnamese;
}

function translationCompareWords(text) {
    var words = String(text || "").toLowerCase().match(/[a-z\u00c0-\u024f\u1e00-\u1eff\u0400-\u04ff]{3,}/g);
    return words || [];
}

// Detects a result that is still mostly the source text. Non-Latin sources compare how
// much of the source script survives; Latin-to-Latin pairs compare shared words.
function translationIsUntranslated(translated, original, from, to) {
    var output = String(translated || "");
    var input = String(original || "");
    if (!output.trim() || !translationSourceDiffers(input, from, to)) return false;
    if (output.replace(/\s+/g, " ").trim() === input.replace(/\s+/g, " ").trim()) {
        return input.trim().length >= 8;
    }

    var script = translationDominantScript(input);
    if (script && script !== "latin" && script !== translationLanguageScript(to)) {
        var originalCount = translationCountScript(input, script);
        if (originalCount < 10) return false;
        var remaining = translationCountScript(output, script);
        var ratio = script === "han" ? 0.2 : 0.5;
        return remaining >= 10 && remaining >= originalCount * ratio;
    }

    if (script === "latin" && translationLanguageScript(to) === "latin") {
        var sourceWords = translationCompareWords(input);
        if (sourceWords.length < 12) return false;
        var outputWords = {};
        var produced = translationCompareWords(output);
        for (var i = 0; i < produced.length; i++) outputWords[produced[i]] = true;
        var shared = 0;
        for (var j = 0; j < sourceWords.length; j++) {
            if (outputWords[sourceWords[j]]) shared++;
        }
        return shared >= sourceWords.length * 0.75;
    }
    return false;
}

function translationIsBoundaryChar(value) {
    return !value || !/[0-9A-Za-z\u00c0-\u024f\u1e00-\u1eff\u0370-\u03ff\u0400-\u04ff\u0590-\u05ff\u0600-\u06ff]/.test(value);
}

// Memory terms match as substrings in scripts without spaces, and on word boundaries
// elsewhere so a name like "Ann" does not match inside "Annual".
function translationTermInText(text, term) {
    var value = String(text || "");
    var needle = String(term || "");
    if (!needle) return false;
    if (/[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff\uac00-\ud7af\u0e00-\u0e7f]/.test(needle)) {
        return value.indexOf(needle) >= 0;
    }
    var position = value.indexOf(needle);
    while (position >= 0) {
        if (translationIsBoundaryChar(value.charAt(position - 1)) &&
            translationIsBoundaryChar(value.charAt(position + needle.length))) {
            return true;
        }
        position = value.indexOf(needle, position + 1);
    }
    return false;
}

// A learned memory source must come from the original: Chinese terms when the source is
// Chinese; otherwise a name-like term (capitalised, or in a caseless script) that appears
// in the text and differs from its translation.
function translationIsMemoryTerm(term, target, text, chineseSource) {
    var source = String(term || "").trim();
    if (!source || source === String(target || "").trim()) return false;
    if (chineseSource) {
        return /[\u3400-\u9fff\uf900-\ufaff]/.test(source) && String(text || "").indexOf(source) >= 0;
    }
    if (!translationTermInText(text, source)) return false;
    var first = source.charAt(0);
    return first !== first.toLowerCase() || first === first.toUpperCase();
}

var TRANSLATION_LANGUAGES_PREFIX = "memory_languages_";

function translationRememberLanguages(bookId, from, to) {
    if (!bookId || !to) return;
    try {
        localStorage.setItem(TRANSLATION_LANGUAGES_PREFIX + bookId, JSON.stringify({ from: from || "auto", to: to }));
    } catch (e) {}
}

function translationRecalledLanguages(bookId) {
    try {
        var stored = JSON.parse(localStorage.getItem(TRANSLATION_LANGUAGES_PREFIX + bookId) || "{}");
        if (stored && stored.to) return { from: String(stored.from || "auto"), to: String(stored.to) };
    } catch (e) {}
    return { from: "auto", to: "vi" };
}

function translationResolveStyle(style, chineseSource) {
    var selected = String(style || "").trim();
    if (selected && selected !== "natural") return selected;
    return chineseSource ? "huyen-huyen" : "tu-nhien";
}

function translationNonChineseNote(chineseSource) {
    if (chineseSource) return "";
    return "Nguyên tác không phải tiếng Trung: bỏ qua mọi chỉ dẫn chỉ dành cho truyện Trung Quốc " +
        "(Hán Việt, xưng hô cổ phong, địa danh hay văn hóa Trung Quốc). Tên riêng giữ nguyên hoặc phiên âm " +
        "theo ngôn ngữ gốc của truyện, xưng hô dựa trên quan hệ và văn hóa của nguyên tác.";
}

