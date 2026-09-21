# YUKU LAB

**つくる、試す、積み重ねる。**

YUKU LAB（ユクラボ）は、日常の活動を管理しながら、制作物や開発経験を外部へ発信する個人向けプラットフォームです。

公開領域ではプロフィール、制作物、技術記事を公開し、本人専用のWorkspaceではタスク、GitHubの開発状況、アプリへの入口を管理します。

> 現在は要件・基本設計のドラフト段階です。認証サービス、ホスティング、公開ページのプリレンダリング方式など、一部の技術要素は未決定です。

## 概要

YUKU LABは、次の2つの領域で構成されます。

- **Public**: トップ、自己紹介、制作物、技術ブログ
- **Workspace**: 日常タスク、GitHub活動の横断表示、制作物紹介の編集、アプリランチャー

GitHubを開発管理の正本とし、IssueやPull RequestをYUKU LABで二重管理しません。YUKU LABではGitHubの情報を読み取り、必要な開発情報をWorkspaceに集約します。

## MVPの範囲

### 公開機能

- プロフィール、経歴概要、技術スタック
- 公開済み制作物の一覧・詳細
- Markdownで管理する技術ブログ
- レスポンシブ表示とSEOメタデータ

### 非公開機能

- 本人ログイン
- 今日・今週のタスク管理
- 登録リポジトリのIssue・Pull Request・最近の活動の横断表示
- 制作物紹介の編集・公開管理
- アプリランチャー

### MVPに含めないもの

- GitHub Issue・Pull Requestの作成、編集、クローズ
- 独自カンバンやGitHubの代替となる開発管理機能
- 家計簿など個別アプリの再実装
- 多人数向けSaaS化
- マイクロサービス化

Integration Hub（複数アプリのサマリー集約、署名付きWebhook、通知センターなど）は、本体MVP完了後の段階的な機能として実装します。

## 技術スタック

| 領域 | 技術 | 状態 |
| --- | --- | --- |
| Frontend | React / TypeScript / Vite | 確定 |
| Styling | Tailwind CSS | 確定 |
| Routing | React Router | 採用案 |
| データ取得 | TanStack Query / fetch | 採用案 |
| Backend | Kotlin / Spring Boot | 採用案 |
| API認証・認可 | Spring Security | 採用案 |
| Database | PostgreSQL | 採用案 |
| 永続化 | Spring Data JPA | 採用案 |
| Migration | Flyway | 採用案 |
| API仕様 | OpenAPI | 採用案 |
| テスト | Vitest / JUnit / Testcontainers | 採用案 |
| ローカル環境 | Docker Compose | 採用案 |
| CI | GitHub Actions | 採用案 |

## リポジトリ構成

```text
yuku-lab/
├── frontend/                 # React + Viteのフロントエンド
│   ├── public/
│   └── src/
│       ├── app/              # Router / Provider
│       ├── features/         # portfolio, dashboard, github, tasks, authなど
│       ├── components/ui/    # 共通UI部品
│       ├── lib/api/          # APIクライアント
│       └── styles/
├── backend/                  # Kotlin + Spring Bootのバックエンド
│   └── src/main/kotlin/.../
│       ├── auth/
│       ├── portfolio/
│       ├── github/
│       ├── task/
│       ├── app/
│       └── common/
├── content/blog/             # Markdown記事
├── docs/                     # 要件、アーキテクチャ、API、ADR
├── infra/compose.yaml        # ローカル開発用サービス
├── .github/workflows/        # CI/CD
└── README.md
```

バックエンドは、まずモジュラーモノリスとして構築します。機能単位の責務を分離しつつ、初期段階で過剰な抽象化やマイクロサービス化は行いません。

## 開発環境

### 前提

以下は設計上の前提です。バージョンは実装開始時に確定します。

- Node.js
- npm または pnpm
- JDK 21
- Gradle 9.7.1（またはGradle Wrapper）
- Docker / Docker Compose
- Git

### セットアップ

```bash
git clone <repository-url>
cd yuku-lab

# 依存関係のインストール
cd frontend
npm install

# 環境変数を変更する場合（任意）
cp ../.env.example ../.env

# PostgreSQLを起動
docker compose -f ../infra/compose.yaml up -d

# バックエンドを起動（別ターミナル）
cd ../backend
./gradlew bootRun
```

バックエンドの起動時にFlywayが`backend/src/main/resources/db/migration/`配下のマイグレーションを適用します。現在の`V1__initial_schema.sql`は、機能テーブルを追加する前の初期マーカーです。

DBの状態確認と停止は次のコマンドで行えます。

```bash
docker compose -f infra/compose.yaml ps
docker compose -f infra/compose.yaml down
```

`docker compose down -v`はPostgreSQLのデータボリュームも削除するため、初期化が必要な場合以外は使用しないでください。

### 起動コマンド

```bash
# frontend
npm run dev

# frontendのテスト
npm test

# backendのテスト
cd backend
./gradlew test
```

バックエンドは Spring Boot 4.1.1、Kotlin 2.2.x、Java 21を使用します。PostgreSQLへの接続情報は環境変数 `DATABASE_URL`、`DATABASE_USERNAME`、`DATABASE_PASSWORD` で上書きできます。

## URL設計

| URL | 内容 | アクセス |
| --- | --- | --- |
| `/` | 公開トップ | Public |
| `/about` | 自己紹介 | Public |
| `/projects` | 制作物一覧 | Public |
| `/projects/:slug` | 制作物詳細 | Public |
| `/blog` | 記事一覧 | Public |
| `/blog/:slug` | 記事詳細 | Public |
| `/app` | ダッシュボード | Owner |
| `/app/tasks` | 日常タスク | Owner |
| `/app/projects` | 制作物紹介の管理 | Owner |
| `/app/github` | GitHub情報の横断閲覧 | Owner |
| `/app/apps` | アプリ登録・連携設定 | Owner |
| `/app/notifications` | 統合通知センター | Owner |

## 設計上の重要なルール

### 情報の正本

- GitHubのリポジトリ、Issue、Pull Request、開発活動はGitHubを正本とする
- 制作物の公開紹介文、技術情報、公開状態はYUKU LABのDBで管理する
- 日常タスクはYUKU LABで管理し、GitHub Issueとは同期しない
- 技術記事はMarkdownをGitで管理する

### 公開情報の保護

- Public APIは公開専用DTOを使用する
- 非公開リポジトリ、Issue本文、アクセストークン、内部メモを公開レスポンスへ含めない
- 公開状態はサーバー側で検証し、フロントエンドの表示切替だけに依存しない
- 公開・非公開の変更はAPI、静的配信、キャッシュまで含めて確認する

### 認証・認可

- パスワード認証は自作せず、外部認証サービスを利用する
- ログイン成功と管理権限を別々に判定する
- 管理APIではJWTの署名、issuer、audience、有効期限、許可済みユーザーを検証する
- トークンをlocalStorageへ永続保存しない
- GitHubの認証情報はブラウザへ返さず、サーバー側で保護する

### GitHub連携

GitHub連携はYUKU LABへのログインとは別機能です。GitHub Appなど、最小権限の読み取り方法を採用します。IssueやPull Requestの作成・編集はGitHub本体で行います。

## APIの概要

### Public API

```text
GET /api/public/projects
GET /api/public/projects/{slug}
```

### Owner API

```text
GET    /api/me
GET    /api/github/repositories
GET    /api/github/issues
GET    /api/github/pulls
GET    /api/portfolio/projects
POST   /api/portfolio/projects
PATCH  /api/portfolio/projects/{id}
GET    /api/tasks
POST   /api/tasks
PATCH  /api/tasks/{id}
DELETE /api/tasks/{id}
GET    /api/apps
POST   /api/apps
PATCH  /api/apps/{id}
DELETE /api/apps/{id}
```

詳細なDTO、エラーコード、ページング、フィルタはOpenAPI定義で確定します。

## 開発の進め方

推奨する順序は次のとおりです。

1. モノレポ、README、開発環境、CIの基盤を整える
2. 公開サイトの静的な画面を作る
3. 認証、DB、マイグレーションを構築する
4. 制作物・タスク管理を実装する
5. GitHub連携を実装する
6. 公開反映、SEO、セキュリティ、バックアップを確認する

Sprint 1の完了条件は、フロントエンド起動、バックエンドのヘルスチェック、ComposeによるDB起動、バックエンドからDBへの接続、フロントエンドからAPIへの疎通、CI上での基本テスト成功です。

## 未決定事項

実装前に以下を決定します。

- 外部認証サービスの製品選定
- 本番ホスティングと月額費用、バックアップ、スリープ条件
- GitHub Appの権限、トークン保存・更新方式、非公開リポジトリの扱い
- Viteでの公開ページのプリレンダリング方式
- DB更新から静的HTML配信までの公開反映フロー
- 非公開化時のキャッシュ削除と反映確認
- 期限付きタスク以外の予定機能をMVPに含めるか
- 画像保管、slug変更時のリダイレクト、公開状態モデル
- ログ監視、外部API障害時のキャッシュ、DBバックアップ・復元運用

## ドキュメント

- 設計書: [`yuku-lab-design-v1.2.md`](./yuku-lab-design-v1.2.md)
- 要件: `docs/requirements/`
- アーキテクチャ: `docs/architecture/`
- API仕様: `docs/api/`
- ADR: `docs/adr/`

## ライセンス

未定です。
