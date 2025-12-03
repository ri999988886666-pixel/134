| № | Команда | Описание | Основные ключи | Пример |
|---|---------|----------|----------------|--------|
| 1 | `git init` | Создать новый репозиторий | `--bare` | `git init проект` |
| 2 | `git clone` | Клонировать репозиторий | `--depth 1` | `git clone https://github.com/...` |
| 3 | `git add` | Добавить файлы в staging | `.`, `-p` | `git add .` |
| 4 | `git commit` | Сделать коммит | `-m`, `-a` | `git commit -m "сообщение"` |
| 5 | `git status` | Показать статус | `-s` | `git status -s` |
| 6 | `git push` | Отправить на сервер | `-u` | `git push origin main` |
| 7 | `git pull` | Получить с сервера | `--rebase` | `git pull origin main` |
| 8 | `git fetch` | Загрузить изменения | `--all` | `git fetch --all` |
| 9 | `git branch` | Работа с ветками | `-a`, `-d` | `git branch -a` |
| 10 | `git checkout` | Переключить ветку | `-b` | `git checkout -b новая` |
| 11 | `git merge` | Слить ветки | `--no-ff` | `git merge feature` |
| 12 | `git diff` | Показать различия | `--staged` | `git diff HEAD~1` |
| 13 | `git log` | История коммитов | `--oneline` | `git log --oneline` |
| 14 | `git reset` | Отменить коммит | `--soft`, `--hard` | `git reset --soft HEAD~1` |
| 15 | `git revert` | Отменить изменения | (нет) | `git revert abc123` |
| 16 | `git stash` | Временно сохранить | `save`, `pop` | `git stash save "работа"` |
| 17 | `git tag` | Работа с тегами | `-a` | `git tag v1.0` |
| 18 | `git remote` | Удаленные репозитории | `add`, `-v` | `git remote add origin url` |
| 19 | `git show` | Показать коммит | `--stat` | `git show abc123` |
| 20 | `git rm` | Удалить файл | `--cached` | `git rm file.txt` |
| 21 | `git mv` | Переместить файл | (нет) | `git mv old new` |
| 22 | `git clean` | Очистить проект | `-fd` | `git clean -fd` |
| 23 | `git grep` | Поиск в коде | `-n` | `git grep "TODO"` |
| 24 | `git rebase` | Перебазировать | `-i` | `git rebase -i HEAD~3` |
| 25 | `git cherry-pick` | Взять коммит | `-n` | `git cherry-pick abc123` |
| 26 | `git bisect` | Найти баг | `start`, `bad`, `good` | `git bisect start` |
| 27 | `git blame` | Автор строк | `-L` | `git blame file.txt -L 10,20` |
| 28 | `git config` | Настройки | `--global` | `git config user.name "Имя"` |
| 29 | `git help` | Помощь | (команда) | `git help commit` |
| 30 | `git archive` | Создать архив | `--format=zip` | `git archive -o release.zip HEAD` |
| 31 | `git describe` | Описать коммит | `--tags` | `git describe --tags` |
| 32 | `git shortlog` | Сводка по авторам | `-sn` | `git shortlog -sn` |
| 33 | `git whatchanged` | Что изменилось | `-p` | `git whatchanged --since="1 week"` |
| 34 | `git reflog` | История HEAD | `show` | `git reflog show` |
| 35 | `git gc` | Сборка мусора | `--auto` | `git gc --auto` |
| 36 | `git fsck` | Проверить целостность | `--full` | `git fsck --full` |
| 37 | `git prune` | Удалить лишнее | `--expire` | `git prune --expire=now` |
| 38 | `git count-objects` | Подсчет объектов | `-v` | `git count-objects -v` |
| 39 | `git verify-pack` | Проверить pack | `-v` | `git verify-pack -v .git/objects/pack/*.idx` |
| 40 | `git cat-file` | Инфо об объекте | `-t`, `-p` | `git cat-file -p HEAD` |
| 41 | `git update-index` | Обновить индекс | `--assume-unchanged` | `git update-index --assume-unchanged file` |
| 42 | `git write-tree` | Записать дерево | (нет) | `git write-tree` |
| 43 | `git commit-tree` | Коммит из дерева | `-p` | `git commit-tree abc -m "msg"` |
| 44 | `git mktree` | Создать дерево | `-z` | `echo "100644 blob abc file" | git mktree` |
| 45 | `git mktag` | Создать тег | `--strict` | `git mktag < tag-file` |
| 46 | `git unpack-file` | Распаковать файл | (нет) | `git unpack-file abc123` |
| 47 | `git diff-index` | Сравнить с индексом | `--cached` | `git diff-index HEAD` |
| 48 | `git update-ref` | Обновить ссылку | `-d` | `git update-ref refs/heads/new abc123` |
| 49 | `git symbolic-ref` | Символическая ссылка | `-q` | `git symbolic-ref HEAD` |
| 50 | `git check-ignore` | Проверить игнор | `-v` | `git check-ignore -v file` |
| 51 | `git check-mailmap` | Проверить mailmap | `--stdin` | `echo "Name" | git check-mailmap` |
| 52 | `git check-ref-format` | Проверить имя ссылки | `--branch` | `git check-ref-format --branch "name"` |
| 53 | `git column` | Форматировать в колонки | `--mode=column` | `git branch | git column --mode=column` |
| 54 | `git credential-cache` | Кэш учетных данных | `--timeout` | `git credential-cache --timeout=3600` |
| 55 | `git credential-store` | Хранилище учетных данных | `--file` | `git credential-store --file=~/.git-credentials` |
| 56 | `git fmt-merge-msg` | Формат сообщения слияния | `--log` | `git fmt-merge-msg < .git/MERGE_MSG` |
| 57 | `git interpret-trailers` | Управление трейлерами | `--trailer` | `git interpret-trailers --trailer="Signed-off-by: Name"` |
| 58 | `git mailinfo` | Инфо из email | `-k` | `git mailinfo msg diff` |
| 59 | `git mailsplit` | Разделить mbox | `-o` | `git mailsplit -o patches < mailbox` |
| 60 | `git merge-file` | Слить три файла | `-p` | `git merge-file current base other` |
| 61 | `git merge-index` | Слияние по индексу | `-o` | `git merge-index -o git-merge-one-file` |
| 62 | `git merge-one-file` | Слить один файл | (нет) | `git merge-one-file base current other` |
| 63 | `git patch-id` | ID патча | `--stable` | `git patch-id < patch.diff` |
| 64 | `git rerere` | Повторное разрешение | `clear` | `git rerere clear` |
| 65 | `git rev-list` | Список коммитов | `--all` | `git rev-list --all --since="2023-01-01"` |
| 66 | `git rev-parse` | Разобрать параметры | `--git-dir` | `git rev-parse --show-toplevel` |
| 67 | `git stripspace` | Убрать пробелы | `-s` | `echo "  text  " | git stripspace` |
| 68 | `git var` | Показать переменные | `-l` | `git var GIT_AUTHOR_IDENT` |
| 69 | `git web--browse` | Открыть в браузере | `-b` | `git web--browse https://github.com` |
| 70 | `git apply` | Применить патч | `--stat` | `git apply patch.diff` |
| 71 | `git checkout-index` | Скопировать из индекса | `-a` | `git checkout-index -a` |
| 72 | `git commit-graph` | Граф коммитов | `write` | `git commit-graph write --reachable` |
| 73 | `git get-tar-commit-id` | ID из tar | (нет) | `git get-tar-commit-id < archive.tar` |
| 74 | `git gui` | Графический интерфейс | `--version` | `git gui` |
| 75 | `git merge-base` | Общий предок | `--all` | `git merge-base main feature` |
| 76 | `git name-rev` | Символическое имя | `--tags` | `git name-rev HEAD` |
| 77 | `git pack-redundant` | Избыточные packs | `--all` | `git pack-redundant --all` |
| 78 | `git range-diff` | Сравнение диапазонов | `--creation-factor` | `git range-diff main..f1 main..f2` |
| 79 | `git read-tree` | Чтение дерева в индекс | `-m` | `git read-tree -m HEAD feature` |
| 80 | `git sh-i18n` | Интернационализация | `--env` | `git sh-i18n --env` |
| 81 | `git show-branch` | Показать ветки | `--all` | `git show-branch --all` |
| 82 | `git show-index` | Показать индекс pack | `--object-format` | `git show-index < .git/objects/pack/pack-*.idx` |
| 83 | `git show-ref` | Показать ссылки | `--heads` | `git show-ref --heads` |
| 84 | `git stage` | Синоним для add | (те же что add) | `git stage file.txt` |
| 85 | `git unpack-objects` | Распаковать объекты | `-n` | `git unpack-objects < pack-file.pack` |
| 86 | `git update-server-info` | Обновить серверную инфо | `-f` | `git update-server-info` |
| 87 | `git upload-archive` | Сервер для archive | `--verbose` | `git upload-archive .` |
| 88 | `git upload-pack` | Сервер для fetch | `--stateless-rpc` | `git upload-pack .` |
| 89 | `git cvsexportcommit` | Экспорт в CVS | `-c` | `git cvsexportcommit -c -p -v HEAD` |
| 90 | `git cvsimport` | Импорт из CVS | `-A` | `git cvsimport -C repo -d :pserver:user@server:/path` |
| 91 | `git imap-send` | Отправить по IMAP | `--curl` | `git imap-send --folder=INBOX.Drafts` |
| 92 | `git quiltimport` | Импорт quilt | `--patches` | `git quiltimport --patches=patches/*` |
| 93 | `git request-pull` | Запрос на pull | `-p` | `git request-pull origin/main feature` |
| 94 | `git send-email` | Отправить email | `--to` | `git send-email --to=dev@list.org patch.patch` |
| 95 | `git svn` | Работа с SVN | `clone`, `dcommit` | `git svn clone https://svn.example.com/project` |
| 96 | `git filter-branch` | Переписать историю | `--tree-filter` | `git filter-branch --tree-filter 'rm -f pass.txt' HEAD` |
| 97 | `git replace` | Заменить объект | `--edit` | `git replace bad good` |
| 98 | `git credential` | Учетные данные | `fill` | `git credential fill` |
| 99 | `git verify-commit` | Проверить подпись коммита | `--verbose` | `git verify-commit HEAD` |
| 100 | `git verify-tag` | Проверить подпись тега | `--verbose` | `git verify-tag v1.0` |
| 101 | `git worktree` | Несколько рабочих деревьев | `add` | `git worktree add ../hotfix hotfix` |
| 102 | `git notes` | Заметки к коммитам | `add` | `git notes add -m "заметка" abc123` |
| 103 | `git bundle` | Упаковать в bundle | `create` | `git bundle create repo.bundle HEAD main` |
| 104 | `git daemon` | Git демон | `--export-all` | `git daemon --export-all --base-path=/git` |
| 105 | `git instaweb` | Веб-интерфейс | `--httpd` | `git instaweb --httpd=webrick --start` |
| 106 | `git mergetool` | Инструмент слияния | `--tool` | `git mergetool --tool=vimdiff` |
| 107 | `git difftool` | Инструмент сравнения | `--tool` | `git difftool --tool=meld HEAD~1` |
| 108 | `git submodule` | Подмодули | `add`, `update` | `git submodule add https://github.com/user/sub.git` |
| 109 | `git switch` | Новый способ переключения | `-c` | `git switch -c новая-ветка` |
| 110 | `git restore` | Новый способ восстановления | `--staged` | `git restore --staged file.txt` |

## 📊 Статистика по категориям

- **Основные команды:** 30 команд (используются ежедневно)
- **Продвинутые команды:** 40 команд (используются периодически)
- **Специализированные:** 40 команд (для специфических задач)